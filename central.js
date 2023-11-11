import { rulezInit } from "./Rulez.js";
import { moveFactory } from "./movee.js";
import {logger} from "./logger.js";
const VERBOSE =false;

const transitions=[
'start~find~eqT',
'find~draw~oZ','find~chose~o1',
'draw~end~isE','draw~yield~rc0',
'chose~table~eqT', 
'table~end~rV','table~end~cM','table~end~isE','table~yield~rc0','table~find~rc1',
'yield~find~eqT',
];

 
function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from, to, cond) {
    let entry;
    if (graph[from] == null) {
      entry = Object.create(null);
      entry.to = to;
      entry.cond = cond;
      graph[from] = [entry];

    } else {
      entry = Object.create(null);
      entry.to = to;
      entry.cond = cond;
      graph[from].push(entry);
    }
  }
  for (let [from, to, cond] of edges.map(r => r.split('~'))) {
    addEdge(from, to, cond);
  }
  return graph;
}

const stateGraph = buildGraph(transitions);

function eqT() { return true; }

export function createMachine() {
  let machine = Object.create(null);
  machine.init = function (gstate) {
    this.state = 'start'
    this.graph = stateGraph;
    this.options = null;
    this.emptyDeck =false;
    this.emptyBank=false;
    this.cardMismatch=false;
    this.rulezViolation=false;
    this.ruleName='';
    this.log=new Map();
    this.opt=new Map();  
    this.cnt=new Map();  
    gstate.deck.register(machine.deckCb);
    gstate.hand.bank.register(machine.bankCb);
    gstate.register(machine.tallyCb );
    rulezInit(machine.rulezVl );
    this.move = moveFactory(this.state, this.round);
  }

  machine.execute = function (gstate) {
    logger.debug('exec');
    this.rc=this.move.execute();
  }

  machine.next = function (gstate) {
    if(this.state=='end' ){
      this.stop();
      return null;
    }
    this.options =this.move.options;
    this.round = this.move.round;
    this.choice = this.move.choice;
    let newStates = this.graph[this.state];
    // select newstate

    for (const item of newStates) {
      if (this.predicate(item.cond)) {
        this.state = item.to;
        return this.move = moveFactory(item.to, this.round, gstate,this.options,this.choice,machine.tableCb,machine.optionsCb);
      }
    }
  }
  machine.deckCb= function(){
    machine.emptyDeck=true;
    logger.debug("heureka");
  }
  machine.bankCb= function(){
    machine.emptyBank=true;
    logger.debug("hello");
  }
  machine.tallyCb= function(){
    machine.cardMismatch=true;
    logger.debug("card missing");
  }
  machine.rulezVl= function(name){
    machine.rulezViolation=true;
    machine.ruleName=name;
    logger.debug("rulez Violation", name);
  }
  machine.tableCb = function (type) {
    if (!machine.log.get(type))
      machine.log.set(type, 1);
    else
      machine.log.set(type, machine.log.get(type)+1);
  }
  machine.optionsCb = function (options) {
    if (!machine.cnt.get(options.length))
      machine.cnt.set(options.length, 1);
    else
      machine.cnt.set(options.length, machine.cnt.get(options.length) + 1);
    for (const item of options) {
      if (!machine.opt.get(item.type))
        machine.opt.set(item.type, 1);
      else
        machine.opt.set(item.type, machine.opt.get(item.type) + 1);
    }
  }
  machine.isE= function () {
    return (this.emptyDeck || this.emptyBank);
  }
  machine.cM= function () {
    return (this.cardMismatch);
  }
  machine.rV= function () {
    return (this.rulezViolation);
  }
machine.rc0= function () {
    return (this.rc ==0);
  }
  machine.rc1= function () {
    return (this.rc >0);
  }
  machine.rcN= function () {
    return (this.rc <0);
  }
  machine.eqT = function () {
    return true;
  }
  machine.oZ = function () {
    return (this.options.length ==0);
  }
  machine.o1 = function () {
    return (this.options.length >0);
  }
  machine.eqF = function () {
    return false;
  }
  machine.predicate = function (name) {
    switch (name) {
      case 'eqT':
        return this.eqT();
      case 'rc0':
        return this.rc0();
      case 'rc1':
        return this.rc1();
      case 'rcN':
        return this.rcN();
      case 'eqF':
        return this.eqF();
      case 'oZ':
        return this.oZ();
      case 'o1':
        return this.o1();
      case 'isE':
        return this.isE();
      case 'cM':
        return this.cM();
      case 'rV':
        return this.rV();
      default:
        logger.debug("predicate not found!");
    }
  }
  machine.stop = function () {
    logger.debug("shutdown");
    if(VERBOSE) this.dumpLog();
    machine.stats = createStatistics(this.emptyBank, this.emptyDeck, this.ruleName, this.round,machine.log, machine.opt,machine.cnt);
    return machine.stats;
  }
  machine.dumpLog = function () {
    console.log (`rounds ${this.round}`);
    console.log(machine.log);
    let no = Array.from(machine.log.values()).reduce((sum, item)=> sum+item);
    console.log(`No of table moves ${no} as in ${no/this.round}`);
    console.log("options");
    console.log(machine.opt);
  }


  return machine;
}

function createStatistics(win, deck, rule, rounds, moves, options, count) {
  let stats = Object.create(null);
  stats.win=win;
  stats.deck=deck;
  stats.rule=rule;
  stats.rounds=rounds;
  stats.moves=moves;
  stats.options=options;
  stats.count=count;
  return stats;
}