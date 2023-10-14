import { moveFactory } from "./movee.js";

const transitions=[
'start~find~eqT',
'find~draw~eqF','find~chose~eqT',
'draw~yield','draw~end',
'chose~table~eqT', 
'table~end~eqT','table~yield~eqF','table~find~eqF',
'yield~find',
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


export const stateGraph = buildGraph(transitions);

function eqT() { return true; }

export function createMachine() {
  let machine = Object.create(null);
  machine.init = function (stateGraph) {
    this.state = 'start'
    this.graph = stateGraph;
    this.options = null;
    this.move = moveFactory(this.state, this.round);
  }
  machine.execute = function () {
    console.log('exec');

    this.move.execute();
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
      if (this.predicate(item.cond)()) {
        this.state = item.to;
        return this.move = moveFactory(item.to, this.round, gstate,this.options);
      }
    }
  }
  machine.eqT = function () {
    return true;
  }
  machine.eqF = function () {
    return false;
  }
  machine.predicate = function (name) {
    switch (name) {
      case 'eqT':
        return this.eqT;
      case 'eqF':
        return this.eqF;
      default:
        console.log("not found!");
    }
  }
    machine.stop = function () {
      console.log("shutdown");
    
  }


  return machine;
}
