import { moveFactory } from "./movee.js";

const transitions=[
'start-find',
'find-draw','find-chose',
'draw-yield','draw-end',
'chose-table', 
'table-end','table-yield','table-find',
'yield-find',
];

 
function buildGraph (edges) {
    let graph = Object.create (null)  ;
    function addEdge(from, to) {
        if(graph[from] ==null){
            graph[from] =[to];

        } else {
            graph[from].push(to)
        }
    }
    for (let [from  , to]  of edges.map(r => r.split('-')) ) {
        addEdge(from, to);
    }
    return graph;
}
const conditions = [
    { from: 'find', to: 'draw', cond: createMachine.optionsEq0 },
    { from: 'draw', to: 'end', cond: createMachine.optionsEq0 }
];

export const stateGraph = buildGraph(transitions);

export function createMachine() {
    let machine = Object.create(null);
    //let conditions = Object.create(null);
    machine.optionsEq0 = function (options) {
        return options.length == 0
    };

    machine.init = function (stateGraph) {
        this.state = 'start'
        this.graph = stateGraph;
        this.move = moveFactory(this.state, this.round);
    }
    machine.execute = function () {
        console.log('exec');

        this.move.execute();
    }
    machine.next = function (gstate) {

        this.round = this.move.round;
        let newStates = this.graph[this.state];
        // select newstate
        /*if (newStates.length > 0) {*/
        for (const item of newStates    ) {

            if (item.cond){
            
        
            this.state = item.to;
            return this.move = moveFactory(newStates[0], this.round, gstate);
            }
        }

    }


    return machine;
}
