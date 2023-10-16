import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { findTuple, findPlus} from "./futils.js";
import { Row, Plus} from "./option.js";


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
result2.push(new Row([
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
result3.push(new Row([
new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
]));
result3.push(new Row([
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

test ('find no card empty table',()  => {
    expect(findPlus(bank5, table5)).toEqual(result5);
});

