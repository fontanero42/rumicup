import { moveFactory } from "./movee.js";

const transitions=[
'start~find~eqT',
'find~draw~oZ','find~chose~o1',
'draw~end~isE','draw~yield~rc0',
'chose~table~eqT', 
'table~end~isE','table~yield~rc0','table~find~rc1',
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
    this.log=new Map();
    this.opt=new Map();  
    gstate.deck.register(machine.deckCb);
    gstate.hand.bank.register(machine.bankCb);
    this.move = moveFactory(this.state, this.round);
  }

  machine.execute = function (gstate) {
    console.log('exec');
    this.rc=this.move.execute();
  }

  machine.next = function (gstate) {
    if(this.state=='end' ){
      this.stop();
      return null;
    }
    this.options =this.move.options;
    this.round = this.move.round;
    let newStates = this.graph[this.state];
    // select newstate

    for (const item of newStates) {
      if (this.predicate(item.cond)) {
        this.state = item.to;
        return this.move = moveFactory(item.to, this.round, gstate,this.options,machine.tableCb,machine.optionsCb);
      }
    }
  }
  machine.deckCb= function(){
    machine.emptyDeck=true;
    console.log("heureka");
  }
  machine.bankCb= function(){
    machine.emptyBank=true;
    console.log("hello");
  }
  machine.tableCb = function (type) {
    if (!machine.log.get(type))
      machine.log.set(type, 1);
    else
      machine.log.set(type, machine.log.get(type)+1);
  }
  machine.optionsCb = function (options) {
    for (const item of options) {
      if (!machine.opt.get(item.type))
        machine.opt.set(item.type, 1);
      else
        machine.opt.set(item.type, machine.log.get(item.type) + 1);
    }
  }
  machine.isE= function () {
    return (this.emptyDeck || this.emptyBank);
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


      default:
        console.log("predicate not found!");
    }
  }
  machine.stop = function () {
    console.log("shutdown");
    this.dumpLog();

  }
  machine.dumpLog = function () {
    console.log (`rounds ${this.round}`);
    console.log(machine.log);
    console.log(machine.opt);
  }


  return machine;
}
