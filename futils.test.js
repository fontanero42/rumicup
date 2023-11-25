import { Card} from "./deck.js";
import { findTuple, findPlus, findSplit, findRight, findLeft, findSequence, findOverflow, findWishList, findCombi} from "./futils.js";
import { RowT, RowS, RowO, RowC, Plus, Middle, Right, Left} from "./option.js";
import { newRow } from "./tutils.js";
//import {removeUid} from "./deck.js"

const bank= new Array();
const result = [];
test ('find no tuple',()  => {
    expect(findTuple(bank)).toEqual(result);
});
const c189=new Card(1,'red');
const c190=new Card(1,'blue');
const c191=new Card(1,'black');
const c192=new Card(1,'orange');

const bank2 =[c189,
c190,
c191,
c192,
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'blue'),
new Card(1,'red'),
new Card(5,'blue'),
new Card(9,'red')
];

let result2 = new Array();
result2.push(new RowT([
    c189,
    c190,
    c191,
    c192,
]));

test ('find tuple 4x1',()  => {
    expect(findTuple(bank2)).toEqual(result2);
});
const c193=new Card(1,'red');
const c194=new Card(1,'blue');
const c195=new Card(1,'black');
const c196=new Card(1,'orange');
const c197=new Card(9,'black');
const c198=new Card(9,'blue');
const c199=new Card(9,'red');

const bank3 =[c193,
c194,
c195,
c196,
new Card(2,'red'),
new Card(1,'red'),
new Card(4,'blue'),
c197,
c198,
c199,
];

const result3 = new Array();
result3.push(new RowT([
    c193,
    c194,
    c195,
    c196,
]));
result3.push(new RowT([
    c197,
    c198,
    c199,
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
const c202 =new Card(1,'red');

const bank5 =[c202,
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
result5.push(new Plus([c202]));

test ('find plus card 1-red for tuple 3x1 ',()  => {
    expect(findPlus(bank5, table5)).toEqual(result5);
});
const c203=new Card(5,'red');

const bank6 =[new Card(1,'orange'),
c203,
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
result6.push(new Middle ([c203]));

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
const  c204=new Card(9,'red')

const bank8 =[new Card(1,'orange'),
new Card(5,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
c204,
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
result8.push(new Right ([c204],true));

test ('find right card 9-red for sequence 4-8.red ',()  => {
    expect(findRight(bank8, table8)).toEqual(result8);
});
const c205=new Card(1,'red');

const bank9 =[new Card(1,'orange'),
new Card(5,'red'),
c205,
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
result9.push(new Right ([c205],false));

test ('find right card 1-red for sequence 4-9.red ',()  => {
    expect(findRight(bank9, table9)).toEqual(result9);
});
const c206=new Card(3,'red');

const bank10 =[new Card(1,'orange'),
c206,
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
result10.push(new Left   ([c206]));

test ('find left card 3-red for sequence 4-8.red ',()  => {
    expect(findLeft(bank10, table10)).toEqual(result10);
});
const c207=new Card(9,'red');

const bank11 =[new Card(1,'orange'),
new Card(3,'red'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
c207,
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
result11.push(new Left   ([c207],true));

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
const c208 =new Card(2,'orange');
const c209 =new Card(1,'orange');
const c210 =new Card(9,'orange');

const bank22 =[new Card(4,'orange'),
c210,
c209,
c208,
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
result22.push(new Middle ([c210]));
result22.push(new Middle ([c209]));
result22.push(new Middle ([c208]));

test ('find split cards 9-2.orange ',()  => {
    expect(findSplit(bank22, table22)).toEqual(result22);
});
const c211=new Card(1,'red');
const c212=new Card(2,'red');
const c213=new Card(3,'red');

const bank13 =[new Card(1,'orange'),
c213,
c211,            
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red'),
c212,
];
const result13 = new Array();
result13.push(new RowS([
c211,
c212,
c213,
]));

test ('find sequence 1-3.red ',()  => {
    expect(findSequence (bank13)).toEqual(result13);
});

const bank14 =[new Card(1,'orange'),
new Card(1,'red'),
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red'),
new Card(2,'red'),
];
const result14 = new Array();

test ('no sequence',()  => {
    expect(findSequence (bank14)).toEqual(result14);
});
const c214=new Card(9,'red');
const c215=new Card(1,'red');
const c216=new Card(2,'red');

const bank15 =[new Card(1,'orange'),
c215,
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
c214,
c216
];
const result15 = new Array();
result15.push(new RowO([
c214,
    c215,
    c216,    
]));
    
    
test ('ovrflow sequence 9-2.red',()  => {
    expect(findOverflow(bank15)).toEqual(result15);
});
const c217 = new Card(9,'black');
const c218 = new Card(1,'black');
const c219 = new Card(2,'black');

const bank16 =[
new Card(1,'red'),
new Card(8,'black'),
c219,
new Card(4,'orange'),
new Card(6,'orange'),
new Card(8,'black'),
new Card(9,'red'),
new Card(7,'black'),
new Card(8,'orange'),
new Card(2,'orange'),
new Card(4,'blue'),
new Card(5,'black'),
new Card(1,'orange'),
c217,
new Card(6,'orange'),
new Card(6,'red'),
new Card(7,'blue'),
c218,
];

const result16 = new Array();
result16.push(new RowO([
    c217 ,
    c218,
    c219,
]));
    
    
test ('overflow sequence 9-2.black',()  => {
    expect(findOverflow(bank16)).toEqual(result16);
});
    const c220=new Card(4,'black');

    const bank17 =[
        new Card(3,'red'),
        new Card(1,'blue'),
        new Card(8,'blue'),
        new Card(5,'orange'),
        new Card(7,'red'),
        new Card(7,'orange'),
        new Card(9,'blue'),
        new Card(8,'blue'),
        new Card(2,'black'),
        new Card(8,'orange'),
        c220,
  ];
            

  const table17 =[];
  table17.push([
    new Card(4,'blue'),
    new Card(4,'red'),
    new Card(4,'black'),
    ]);
    table17.push([
        new Card(4,'blue'),
        new Card(4,'red'),
        new Card(4,'orange'),
        ]);
    
const result17 = new Array();
result17.push(new Plus([
    c220
]));

test ('find bug',()  => {
    expect(findPlus(bank17, table17)).toEqual(result17);
});
const c180=new Card(4,'black');
const c181=new Card(4,'red');
const c182=new Card(4,'blue');
const c183=new Card(4,'orange');
const c184=new Card(4,'black');
const c185=new Card(7,'black');
const c186=new Card(7,'orange');
const c187=new Card(4,'orange');

const table24 =new Array();
table24.push([
c180,
c181,
c182,
c183,
]);

    table24.push([
c184,
        new Card(5,'black'),
        new Card(6,'black'),
c185,
        ]);
    
table24.push([
c186,
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
c187,
]);
const result24 = [
c180,
c181,
c182,
c183,
c184,
c185,
c186,
c187,
];
test ('wishlist',()  => {
    expect(findWishList(table24)).toEqual(result24);
});
const  c221=  new Card(4,'red');
c221.imagine = true;
const  c222=  new Card(5,'red');
c222.imagine = false;
const  c223=  new Card(6,'red');
c223.imagine = false;
const bank25 =new Array();
bank25.push(
    c222,
    c223,
)
const table25 =new Array();
table25.push([
    new Card(4,'black'),
    c221,
    new Card(4,'blue'),
    new Card(4,'orange'),
    ]);
    let result25 = new Array(); 
    result25.push(new RowC(
     [
        c221,
        c222,
        c223,
    ]));
    /**
    result25.map(card =>  {
        {card.imagine = true}
        });
         */ 
    test ('wishlist',()  => {
        expect(findCombi(bank25, table25)).toEqual(result25);
    });

const bank26 =new Array();
bank26.push(
    new Card(6,'red'),
)
const table26 =new Array();
table26.push([
    new Card(4,'black'),
    new Card(4,'red'),
    new Card(4,'blue'),
    new Card(4,'orange'),
    ]);
    table26.push([
        new Card(5,'black'),
        new Card(5,'red'),
        new Card(5,'blue'),
        new Card(5,'orange'),
        ]);
    
    const result26 = new Array(); 
    test ('wishlist 2* imagine true',()  => {
        expect(findCombi(bank26, table26)).toEqual(result26);
    });  