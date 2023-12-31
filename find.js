import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { Option, Right, RowT, RowS, RowO,   Left, Plus } from "./option.js";
import { findTuple, findPlus, findSplit, findRight, findLeft, findOverflow,  findSequence, findCombi} from "./futils.js";
import {logger} from "./logger.js";

export class Move {
  constructor(round) {
    this.cards = new Array();
    this.valor = 0;
    this.next = null;
    this.message = "";
    this.round = round;
  }

  log() {
    logger.debug(`round=${this.round} at=${this.message}`);
  }

  dispatch() {
    return this.next;
  }
}

export class Find extends Move {
  constructor(round, gstate,cb) {
    super(round);
    super.message = "find";
    this.gstate = gstate;
    this.options = new Array();
    this.callback = cb;
  }

  execute() {
    super.log();
    const s_options = findSequence(this.gstate.hand.bank);
    const o_options = findOverflow(this.gstate.hand.bank);
    const t_options = findTuple(this.gstate.hand.bank);
    const r_options = findRight(this.gstate.hand.bank,this.gstate.table);
    const l_options = findLeft(this.gstate.hand.bank,this.gstate.table);
    const p_options = findPlus(this.gstate.hand.bank,this.gstate.table);
    const i_options = findSplit(this.gstate.hand.bank,this.gstate.table);
    const c_options = findCombi(this.gstate.hand.bank,this.gstate.table);
    const options = s_options
      .concat(o_options)
      .concat(t_options)
      .concat(r_options)
      .concat(l_options)
      .concat(p_options)
      .concat(i_options)
      .concat(c_options);
      //const options=t_options.concat(p_options);
    this.options = options;
    this.callback(options);
    return options;
  }


}

export class Yield extends Move {
  constructor(round, gstate, cbSnapshot) {
    super(round);
    super.message = "yield";
    this.gstate = gstate;
    this.callback= cbSnapshot;
  }

  execute(gstate) {
    super.log();
    this.round++;
//    return new Find(this.round, this.gstate);
    this.callback(this.round,gstate.table);
  }
}
