import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { findTuple, findPlus, findSplit, findRight, findLeft} from "./futils.js";
import { RowT, RowS, Plus, Middle, Right, Left} from "./option.js";


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

const bank8 =[new Card(1,'orange'),
new Card(5,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table8 =new Array();
table8.push([
new Card(4,'red'),
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
]);
const result8 = new Array();
result8.push(new Right ([
    new Card(9,'red')
],true));

test ('find right card 9-red for sequence 4-8.red ',()  => {
    expect(findRight(bank8, table8)).toEqual(result8);
});

const bank9 =[new Card(1,'orange'),
new Card(5,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
];
const table9 =new Array();
table9.push([
new Card(4,'red'),
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
new Card(9,'red'),
]);
const result9 = new Array();
result9.push(new Right ([
    new Card(1,'red')
],false));

test ('find right card 1-red for sequence 4-9.red ',()  => {
    expect(findRight(bank9, table9)).toEqual(result9);
});

const bank10 =[new Card(1,'orange'),
new Card(3,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table10 =new Array();
table10.push([
new Card(4,'red'),
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
]);
const result10 = new Array();
result10.push(new Left   ([
    new Card(3,'red')
],true));

test ('find left card 3-red for sequence 4-8.red ',()  => {
    expect(findLeft(bank10, table10)).toEqual(result10);
});

const bank11 =[new Card(1,'orange'),
new Card(3,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table11 =new Array();
table11.push([
new Card(1,'red'),
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'red'),
new Card(5,'red'),
]);
const result11 = new Array();
result11.push(new Left   ([
    new Card(9,'red')
],true));

test ('find left card 9-red for sequence 1-5.red ',()  => {
    expect(findLeft(bank11, table11)).toEqual(result11);
});

const bank12 =[new Card(1,'orange'),
new Card(3,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table12 =new Array();
table12.push([
new Card(1,'red'),
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'red'),
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
new Card(9,'red'),
]);
const result12 = new Array();


test ('no left card for sequence 1-9.red ',()  => {
    expect(findLeft(bank12, table12)).toEqual(result12);
});

test ('no right card for sequence 1-9.red ',()  => {
    expect(findRight(bank12, table12)).toEqual(result12);
});

const bank22 =[new Card(4,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(4,'red'),
new Card(2,'blue'),
new Card(2,'black'),
];
const table22 =new Array();
table22.push([
    new Card(1,'black'),
    new Card(2,'black'),
    new Card(3,'black'),
    new Card(4,'black'),
    ]);

    table22.push([
        new Card(4,'black'),
        new Card(5,'black'),
        new Card(6,'black'),
        new Card(7,'black'),
        ]);
    
table22.push([
new Card(7,'orange'),
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
new Card(4,'orange'),
]);
const result22 = new Array();
result22.push(new Middle ([
    new Card(9,'orange'),
]));
result22.push(new Middle ([
    new Card(1,'orange'),
]));
result22.push(new Middle ([
    new Card(2,'orange'),
]));

test ('Can not find split card error ',()  => {
    expect(findSplit(bank22, table22)).toEqual(result22);
});
