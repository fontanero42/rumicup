import { Chose, Draw} from "./movee.js";
import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { Option, Right, Row, Left, Plus } from "./option.js";

export class Move {
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
  
    dispatch() {
      return this.next;
    }
  }

export class Find extends Move {
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
            let overflow = false;
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
                    options.push(new Right(cards, overflow));
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

export  class Yield extends Move {
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
  