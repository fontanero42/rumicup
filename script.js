import { factory} from "./deck.js";
import { createMachine } from "./central.js";
import { TestCase1, TestCase2, TestCase3} from "./testcase.js";
import {logger} from "./logger.js";
const VERBOSE =false;


const MAX_VALUE = 9;
const INITIAL_BANK = 6;
const TUPPLE_THRESHOLD = 3;
const MIN_SEQUENCE = 3;

class Hand {
  constructor(d1) {
    this.bank =  createBank();
    for (let i = 0; i < INITIAL_BANK; i++) {
      this.bank.push(d1.shift());
    }
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

  b1.toString= function(){
    let s2='';
    let s1="Bank***************************\n";
    for (const element of b1) {
      s2 = s2.concat(element.toString());
    }
    let s3="\n*******************************";
    return s1+s2+s3;
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
    this.initialDeckSize = this.deck.length;
    this.hand = new Hand(this.deck);
    this.table = new Array();
    this.data = new Array();
  }

  play(machine){
 let nx;
 logger.info('Hello, world!');
 logger.debug(this.hand.bank);
 logger.trace(this.hand.bank);
 
    do {
      machine.execute(this);
      //this.dumpState();
      this.tallyCards();
      nx = machine.next(this);
    } while(nx != null);
    return machine.stats;
  }

  register (cb){
    this.callback = cb;
  }

  tallyCards() {
    let b = 0;
    let t = 0;
    let d = 0;
    b = this.hand.bank.length;
    for (const row of this.table) {
      t += row.length;
    }
    d = this.deck.length;
    let c = b + t + d;
    logger.debug(`bank:${b} table:${t} deck:${d} cards:${c}`);
    if (c != this.initialDeckSize)
      this.callback();
  }
  dumpState() {
    console.log(this.hand.bank.toString());
    this.dumpTable();
  }


  dumpTable() {
    console.log("Table" + "============================");
    for (const set of this.table) {
      let line = new String();
      for (const element of set) {
        line = line.concat(element.toString());
      }
      console.log(line);
      console.log("============================");
    }
  }
}
const Data= new Array();
for(let a=0; a<10000;a++){
const g = new GameState();
let machine= createMachine();

machine.init(g);
Data.push( g.play(machine));
if(Data[Data.length-1].rule!='') {
  g.dumpTable();
  break ;
}
};

//console.log(Data);
//console.log(new Card(1, "red").equals(new Card(1, "red")));
const reducer =(map, val)=>{
  if(map[val]== null) {
    map[val]=1;
   } else{
    ++map[val];
   }
   return map;
  };
console.log(Data.map(item => item.rule).reduce(reducer,{}));
console.log(Data.map(item => item.win).reduce(reducer,{}));
console.log(Data.map(item => item.rounds).reduce(reducer,{}));