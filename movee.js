import { Move, Find, Yield } from "./find.js";
import { Card, MAX_VALUE } from "./deck.js";
import { splitCard } from "./tutils.js";
import { rulez} from "./Rulez.js";

export function moveFactory(type, round, gstate, options, cb1, cb2) {
  let move;
  switch (type) {
    case 'start':
      move = new NoOp(gstate);
      break;
    case 'find':
      move = new Find(round, gstate, cb2);
      break;
    case 'draw':
      move = new Draw(round, gstate);
      break;
    case 'yield':
      move = new Yield(round, gstate);
      break;
    case 'chose':
      move = new Chose(round, gstate, options);
      break;
    case 'table':
      move = new Surface(round, gstate, options, false, cb1);
      break;
    case 'end':
      move = new End(round, gstate, 'finis');
      break;

    default:
      return null;
  }
  return move;
}



export class NoOp extends Move {
  constructor(gstate) {
    super(0);
    super.message = "start";
    this.gstate = gstate;
  }

  execute() {
    super.log();
  }
}


export class Chose extends Move {
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
    this.options = option;
    return option;
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

export class Surface extends Move {
  constructor(round, gstate, option, last, cb) {
    super(round);
    super.message = "table " + option.type;
    this.gstate = gstate;
    for (let item of option.cards) {
      this.cards.push(item);
    }
    this.type = option.type;
    this.last = last;
    this.count = option.count;
    this.overflow = option.overflow;
    this.callback = cb;
    this.callbackRulez = rulez;
  }

 
  execute() {
    super.log();
    this.dumpCard();
    this.callback(this.type);
    let bsize;
    switch (this.type) {
      case "right":
        bsize = this.joinCard();
        break;
      case "left":
        bsize = this.joinCard();
        break;
      case "rowT":
        bsize = this.newRow();
        break;
      case "rowS":
        bsize = this.newRow();
        break;
      case "rowO":
        bsize = this.newRow();
        break;
      case "plus":
        bsize = this.plusCard();
        break;
      case "middle":
        bsize = splitCard(this.gstate.hand.bank, this.gstate.table, this.cards);
        break;
      default:
        return -1;
     }
    this.callbackRulez(this.gstate.table);
    if (bsize < 1) return -1;
    if (this.overflow) return 1;
    if (this.last) return 0;
    else return 1;

  }

  dumpCard() {
    let line = new String();
    console.log("Card" + ".......................");
    for (const element of this.cards) {
      line = line.concat(element.toString());
    }
    console.log(line);
    console.log("................................");
  }


  fromBank(card) {
    let i;
    i = this.gstate.hand.bank.indexOf(card);
    this.gstate.hand.bank.take(i, 1);
    //this.gstate.hand.bank.splice(i, 1);
    return i;
  }

  checkRow(type, row, card) {
    if (type == 'right') {
      if (row[row.length - 1].valor % MAX_VALUE == card.valor - 1) {
        row.push(card);
        return true;
      }
    } else {
      if (card.valor % MAX_VALUE == row[0].valor - 1) {
        row.unshift(card);
        return true;
      }
    }
    return false;
  }


  joinCard() {
    const color = this.cards[0].color;
    for (const row of this.gstate.table) {
      if (row[0].valor != row[1].valor) {
        if (row[0].color == color) {
          // ToDo check forrr duplicatee rrrow
          if (this.checkRow(this.type, row, this.cards[0])) {
            this.fromBank(this.cards[0]);
            return this.gstate.hand.bank.length;
          }
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
          if (row.length < Card.allColors.length) {
            if (this.type == "plus") row.push(this.cards[0]);
            if (this.count > 1) {
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
      this.gstate.hand.bank.take(i, 1);
      //this.gstate.hand.bank.splice(i, 1);
      collector.push(card);
    }
    this.gstate.table.push(collector);
    return this.gstate.hand.bank.length;
  }
}
export class End extends Move {
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


export class Draw extends Move {
  constructor(round, gstate) {
    super(round);
    super.message = "draw";
    this.gstate = gstate;
  }

  execute() {
    super.log();
    if (this.draw() == 0) return -1;
    else return 0;
  }

  draw() {
    this.gstate.hand.bank.push(this.gstate.deck.draw());
    return this.gstate.deck.length;
  }
}
