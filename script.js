import { factory, Card } from "./deck.js";
import { TestCase1, TestCase2, TestCase3} from "./test.js";

const MAX_VALUE = 9;
const INITIAL_BANK = 6;
const TUPPLE_THRESHOLD = 3;
const MIN_SEQUENCE = 3;

class Hand {
  constructor(d1) {
    this.bank = new Array();
    for (let i = 0; i < INITIAL_BANK; i++) {
      this.draw(d1);
    }
  }

  draw(d1) {
    this.bank.push(d1.shift());
  }
}

class Move {
  constructor(round) {
    this.cards = new Array();
    this.valor = 0;
    this.next = null;
    this.message = "";
    this.round = round;
  }

  log() {
    console.log(`round=${this.round} at=${this.message}`);
  }
}

class Option {
  constructor(cards) {
    this.cards = new Array();
    this.valor = 0;
    this.count = 0;
    this.overflow = false;
    for (let item of cards) {
      this.cards.push(item);
      this.valor += item.valor;
      this.count ++;
    }
  }
}

class Right extends Option {
  constructor(cards, overflow=false) {
    super(cards);
    super.overflow=overflow;
    this.type = "right";
  }
}

class Left extends Option {
  constructor(cards) {
    super(cards);
    this.type = "left";
  }
}

class Row extends Option {
  constructor(cards) {
    super(cards);
    this.type = "row";
  }
}

class Plus extends Option {
  constructor(cards) {
    super(cards);
    this.type = "plus";
  }
}

class Chose extends Move {
  constructor(round, gstate, options) {
    super(round);
    super.message = "chose";
    this.gstate = gstate;
    this.options = options;
  }

  execute() {
    super.log();
    const option = this.best();
    if (option.valor == 0) return new Yield(this.round, this.gstate);

    if (this.options.length > 1 || this.overflow)
      return new Surface(this.round, this.gstate, option, false);
    else return new Surface(this.round, this.gstate, option, true);
  }

  best() {
    let first = { valor: 0 };
    for (const choice of this.options) {
      if (choice) {
        if (choice.valor > first.valor) first = choice;
      }
    }
    return first;
  }
}

class Surface extends Move {
  constructor(round, gstate, option, last) {
    super(round);
    super.message = "table";
    this.gstate = gstate;
    for (let item of option.cards) {
      this.cards.push(item);
    }
    this.type = option.type;
    this.last = last;
    this.count = option.count;
    this.overflow = option.overflow;
  }

  execute() {
    super.log();
    let bsize;
    switch (this.type) {
      case "right":
        bsize = this.joinCard();
        break;
      case "left":
        bsize = this.joinCard();
        break;
      case "row":
        bsize = this.newRow();
        break;
      case "plus":
        bsize = this.plusCard();
        break;
      default:
        return new End(this.round, this.gstate, " End option unkown");
    }
    if (bsize < 1) return new End(this.round, this.gstate, "win empty bank");
    if (this.overflow) return new Find(this.round, this.gstate);
    if (this.last) return new Yield(this.round, this.gstate);
    else return new Find(this.round, this.gstate);
  }
  fromBank(card) {
    let i;
    i = this.gstate.hand.bank.indexOf(card);
    this.gstate.hand.bank.splice(i, 1);
    return i;
  }

  joinCard() {
    const color = this.cards[0].color;
    for (const row of this.gstate.table) {
      if (row[0].valor != row[1].valor) {
        if (row[0].color == color) {
          if (this.type == "right") row.push(this.cards[0]);
          else row.unshift(this.cards[0]);
          this.fromBank(this.cards[0]);
        }
      }
    }

    return this.gstate.hand.bank.length;
  }

  plusCard() {
    const valor = this.cards[0].valor;
    for (const row of this.gstate.table) {
      if (row[0].valor == row[1].valor) {
        if (row[0].valor == valor) {
          if(row.length < Card.allColors.length){
            if (this.type == "plus") row.push(this.cards[0]);
           if(this.count>1){
            console.log('bis');
           }
            this.fromBank(this.cards[0]);
          }
        }
      }
    }
    return this.gstate.hand.bank.length;
  }

  newRow() {
    const collector = new Array();
    let i;
    for (const card of this.cards) {
      i = this.gstate.hand.bank.indexOf(card);
      this.gstate.hand.bank.splice(i, 1);
      collector.push(card);
    }
    this.gstate.table.push(collector);
    return this.gstate.hand.bank.length;
  }
}

class Find extends Move {
  constructor(round, gstate) {
    super(round);
    super.message = "find";
    this.gstate = gstate;
  }

  execute() {
    super.log();
    const s_options = this.findSequence();
    const t_options = this.findTuple();
    const c_options = this.findRight();
    const l_options = this.findLeft();
    const p_options = this.findPlus();
    const options = s_options
      .concat(t_options)
      .concat(c_options)
      .concat(l_options)
      .concat(p_options);
      //const options=t_options.concat(p_options);
    if (options.length > 0) return new Chose(this.round, this.gstate, options);
    else return new Draw(this.round, this.gstate);
  }

  findSequence() {
    const options = new Array();
    let collector = new Array();
    //sort by color and add sequentially
    for (const color of Card.allColors) {
      for (let i = 0; i < MAX_VALUE + 1; i++) {
        for (const card of this.gstate.hand.bank) {
          if (color == card.color) {
            if (i == card.valor) {
              collector.push(i);
            }
          }
        }
      }
      //check for gaps
      //console.log(collector);
      const result = collector
        .reduce(
          (seq, v, i, a) => {
            if (i && a[i - 1] !== v - 1) {
              seq.push([]);
            }
            seq[seq.length - 1].push(v);
            return seq;
          },
          [[]]
        )
        .filter(({ length }) => length > MIN_SEQUENCE - 1);
      //console.log(result);
      //assemble options
      let ix;
      let cards = new Array();
      for (const outer of result) {
        for (const inner of outer) {
          ix = this.gstate.hand.bank.findIndex(
            (element) => element.color == color && element.valor == inner
          );
          cards.push(this.gstate.hand.bank[ix]);
        }
        options.push(new Row(cards));
        cards = [];
      }
      collector = [];
    }
    return options;
  }
  findTuple() {
    const options = new Array();
    const tuple = new Array(MAX_VALUE + 1);
    let second;
    let third;
    /*for (let i = 0; i < MAX_VALUE + 1; i++) {
      tuple[i] = new Set();
    }*/
    const collector = new Set();
    for (let n = 1; n < MAX_VALUE + 1; n++) {
      second = this.gstate.hand.bank.filter((element) => element.valor == n);
      third = second.map((element) => element.color);
      //distinct
      tuple[n] = [...new Set(third)];
      if (tuple[n].length >= TUPPLE_THRESHOLD) {
        for (const t of tuple[n]) {
          collector.add(
            this.gstate.hand.bank.find(
              (element) => element.color == t && element.valor == n
            )
          );
        }
        options.push(new Row(collector));
        collector.clear();
      }
    }
    return options;
  }

  findRight() {
    const options = new Array();
    if (this.gstate.table.length > 0) {
      let ix;
      let color;
      let valor;
      let overflow=false;
      let cards = new Array();
      for (const row of this.gstate.table) {
        if (row[0].valor != row[1].valor) {
          valor = row[row.length - 1].valor + 1;
          if (valor > MAX_VALUE) valor = 1;
          if (valor == MAX_VALUE) overflow = true;
          
          color = row[row.length - 1].color;
        }
        ix = this.gstate.hand.bank.findIndex(
          (element) => element.color == color && element.valor == valor
        );
        if (ix >= 0) {
          cards.push(this.gstate.hand.bank[ix]);
          options.push(new Right(cards,overflow));
        }
        ix = -1;
        cards = [];
      }
    }
    return options;
  }

  findLeft() {
    const options = new Array();
    if (this.gstate.table.length > 0) {
      let ix;
      let color;
      let valor;
      let cards = new Array();
      for (const row of this.gstate.table) {
        if (row[0].valor != row[1].valor) {
          valor = row[0].valor - 1;
          if (valor == 0) valor = MAX_VALUE;
          color = row[0].color;
        }
        ix = this.gstate.hand.bank.findIndex(
          (element) => element.color == color && element.valor == valor
        );
        if (ix >= 0) {
          cards.push(this.gstate.hand.bank[ix]);
          options.push(new Left(cards));
        }
        ix = -1;
        cards = [];
      }
    }

    return options;
  }
  findPlus() {
    const options = new Array();
    if (this.gstate.table.length > 0) {
      let ix;
      let valor;
      let cards = new Array();
      let difference = new Set();
      for (const row of this.gstate.table) {
        if (row[0].valor == row[1].valor) {
          valor = row[0].valor;
          const exists = new Set();
          for (const card of row) {
            exists.add(card.color);
          }
          difference = new Set(
            [...Card.allColors].filter((x) => !exists.has(x))
          );
        }
        //look for card on bank
        for (const item of difference) {
          ix = this.gstate.hand.bank.findIndex(
            (element) => element.color == item && element.valor == valor
          );
          if (ix >= 0) {
            cards.push(this.gstate.hand.bank[ix]);
            options.push(new Plus(cards));
          }
        }
        ix = -1;
        cards = [];
        difference.clear();
      }
    }

    return options;
  }
}

class NoOp extends Move {
  constructor(gstate) {
    super(0);
    super.message = "start";
    this.gstate = gstate;
  }

  execute() {
    super.log();
    return new Find(1, this.gstate);
  }
}

class End extends Move {
  constructor(round, gstate, reason) {
    super(round);
    super.message = "end" + " " + reason;
    this.gstate = gstate;
  }

  execute() {
    super.log();
    console.log(this.message);
    return this.next;
  }
}

class Yield extends Move {
  constructor(round, gstate) {
    super(round);
    super.message = "yield";
    this.gstate = gstate;
  }

  execute() {
    super.log();
    this.round++;
    return new Find(this.round, this.gstate);
  }
}

class Draw extends Move {
  constructor(round, gstate) {
    super(round);
    super.message = "draw";
    this.gstate = gstate;
  }

  execute() {
    super.log();
    if (this.draw() > 0) return new Yield(this.round, this.gstate);
    else return new End(this.round, this.gstate, "empty deck");
  }

  draw() {
    this.gstate.hand.bank.push(this.gstate.deck.shift());
    return this.gstate.deck.length;
  }
}

//build a new deck

class GameState {
  constructor(test=false) {
    if (test)
      this.deck = TestCase3;
    else 
      this.deck = factory();
    this.hand = new Hand(this.deck);
    this.moves = new Array();
    this.table = new Array();
    this.winner = null;
  }

  play() {
    let nx;
    nx = new NoOp(this);
    this.moves.push(nx);
    do {
      nx = this.moves.shift();
      this.dumpState();
      nx = nx.execute();
      if (nx) this.moves.push(nx);
    } while (this.moves[0] != null);
  }

  dumpState() {
    this.dumpBank();
    this.dumpTable();
  }

  dumpBank() {
    let line = new String();
    console.log("Bank" + "***************************");
    for (const element of this.hand.bank) {
      line = line.concat(element.toString());
    }
    console.log(line);
    console.log("***************************");
  }

  dumpTable() {
    let c=0;
    console.log("Table" + "============================");
    for (const set of this.table) {
      let line = new String();
      for (const element of set) {
        line = line.concat(element.toString());
        c++;
      }
      console.log(line);
      console.log("============================");
    }
    console.log(c + "cards")
  }
}

const g = new GameState(true);
g.play();

//console.log(new Card(1, "red").equals(new Card(1, "red")));
