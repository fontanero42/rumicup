import { factory, Card } from "./deck.js";
import { moveFactory} from "./movee.js";
import { Find } from "./find.js";
import { createMachine } from "./central.js";

import { TestCase1, TestCase2, TestCase3} from "./testcase.js";

const MAX_VALUE = 9;
const INITIAL_BANK = 6;
const TUPPLE_THRESHOLD = 3;
const MIN_SEQUENCE = 3;

class Hand {
  constructor(d1) {
//    this.bank = new Array();
    this.bank = new createBank();
    for (let i = 0; i < INITIAL_BANK; i++) {
      //this.draw(d1);
      this.bank.push(d1.shift());
    }
  }

  draw(d1) {
    this.bank.push(d1.shift());
  }
}

function createBank() {
  const b1 = new Array();

  b1.take = function(index,count){
    b1.splice(index,count);
    if(b1.length==0)
      b1.callback();
  }

b1.register = function(cb){
    b1.callback = cb;
  }
  return b1;
}


//build a new deck

class GameState {
  constructor(test=false) {
    if (test)
      this.deck = TestCase2;
    else 
      this.deck = factory();
    this.hand = new Hand(this.deck);
    this.moves = new Array();
    this.table = new Array();
    this.winner = null;
  }

  play(machine){
 let nx;

    do {
      machine.execute(this);
      this.dumpState();
      nx = machine.next(this);
    } while(nx != null);
  }

  dumpState() {
    let b=0;
    let t=0;
    let d=0;
    b=this.dumpBank();
    t=this.dumpTable();
    d=this.deck.length;
    let c=b+t+d
    console.log(`bank:${b} table:${t} deck:${d} cards:${c}`);
  }

  dumpBank() {
    let c=0;
    let line = new String();
    console.log("Bank" + "***************************");
    for (const element of this.hand.bank) {
      line = line.concat(element.toString());
      c++
    }
    console.log(line);
    console.log("***************************");
    return c;
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
    return  c;
  }
}

const g = new GameState();
let machine= createMachine();

machine.init(g);
g.play(machine);

//console.log(new Card(1, "red").equals(new Card(1, "red")));
