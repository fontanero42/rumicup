import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { findTuple, findPlus, findSplit} from "./futils.js";
import { RowT, RowS, Plus, Middle} from "./option.js";


const bank= new Array();
const result = [];
test ('find no tuple',()  => {
    expect(findTuple(bank)).toEqual(result);
});

const bank2 =[new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'blue'),
new Card(1,'red'),
new Card(5,'blue'),
new Card(9,'red')
];

const result2 = new Array();
result2.push(new RowT([
new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
]));

test ('find tuple 4x1',()  => {
    expect(findTuple(bank2)).toEqual(result2);
});

const bank3 =[new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
new Card(2,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];

const result3 = new Array();
result3.push(new RowT([
new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
]));
result3.push(new RowT([
    new Card(9,'black'),
    new Card(9,'blue'),
    new Card(9,'red')
]));
    
test ('find 2*tuple 4x1 and 3x9',()  => {
    expect(findTuple(bank3)).toEqual(result3);
});


const bank4 =[new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
new Card(2,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table4 =[];
const result4 = new Array();

test ('find no card empty table',()  => {
    expect(findPlus(bank4, table4)).toEqual(result4);
});

const bank5 =[new Card(1,'red'),
new Card(2,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table5 =new Array();
table5.push([
    new Card(1,'blue'),
    new Card(1,'black'),
    new Card(1,'orange'),    
]);
const result5 = new Array();
result5.push(new Plus([
    new Card(1,'red')
]));

test ('find plus card 1-red for tuple 3x1 ',()  => {
    expect(findPlus(bank5, table5)).toEqual(result5);
});

const bank6 =[new Card(1,'orange'),
new Card(5,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table6 =new Array();
table6.push([
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'red'),
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
new Card(9,'red'),
]);
const result6 = new Array();
result6.push(new Middle ([
    new Card(5,'red'),
]));

test ('find split card 5-red for sequence 2-9.red ',()  => {
    expect(findSplit(bank6, table6)).toEqual(result6);
});

const bank7 =[new Card(1,'orange'),
new Card(5,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table7 =new Array();
table7.push([
new Card(4,'red'),
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
]);
const result7 = new Array();

test ('Can not find split card 5-red for sequence 4-9.red ',()  => {
    expect(findSplit(bank7, table7)).toEqual(result7);
});

