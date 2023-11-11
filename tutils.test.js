import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { newRow, plusCard, splitCard} from "./tutils.js";

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
const cards6 =new Array();
cards6.push(
new Card(5,'red'),
);
const result6 = new Array();
result6.push([
    new Card(2,'red'),
new Card(3,'red'),
new Card(4,'red'),
new Card(5,'red'),
]);
result6.push([
new Card(5,'red'),
new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
new Card(9,'red'),
]);

test ('split card 5-red for sequence 2-9.red ',()  => {
    expect(splitCard(bank6, table6, cards6)).toEqual(result6);
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
const cards22 =new Array();
cards22.push(
new Card(9,'orange'),
);
const result22 = new Array();
result22.push([

new Card(1,'black'),
new Card(2,'black'),
new Card(3,'black'),
new Card(4,'black'),
]);
result22.push([
    new Card(4,'black'),
    new Card(5,'black'),
    new Card(6,'black'),
    new Card(7,'black'),
]);

result22.push([
    new Card(7,'orange'),
    new Card(8,'orange'),
    new Card(9,'orange'),
]);
result22.push([
    new Card(9,'orange'),
    new Card(1,'orange'),
    new Card(2,'orange'),
    new Card(3,'orange'),
    new Card(4,'orange'),
    ]);
test ('split card ',()  => {
    expect(splitCard(bank22, table22, cards22)).toEqual(result22);
});

const bank23 =[new Card(7,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(4,'red'),
new Card(2,'blue'),
new Card(7,'orange'),
new Card(2,'black'),
];
const table23 =new Array();
table23.push([
    new Card(1,'black'),
    new Card(2,'black'),
    new Card(3,'black'),
    new Card(4,'black'),
    ]);

table23.push([
new Card(7,'red'),
new Card(7,'blue'),
new Card(7,'black'),
]);
    
table23.push([
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
new Card(4,'orange'),
]);
const cards23 =new Array();
cards23.push(
new Card(7,'orange'),
);
const result23 = new Array();
result23.push([
new Card(1,'black'),
new Card(2,'black'),
new Card(3,'black'),
new Card(4,'black'),
]);
result23.push([
new Card(7,'red'),
new Card(7,'blue'),
new Card(7,'black'),
new Card(7,'orange'),
]);
result23.push([
    new Card(8,'orange'),
    new Card(9,'orange'),
    new Card(1,'orange'),
    new Card(2,'orange'),
    new Card(3,'orange'),
    new Card(4,'orange'),
    ]);
    test ('plus card 7-orange',()  => {
        expect(plusCard(bank23, table23, cards23)).toEqual(result23);
    });
    
    const bank24 =[
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
        new Card(4,'black'),
  ];
            

  const table24 =[];
  table24.push([
    new Card(4,'blue'),
    new Card(4,'red'),
    new Card(4,'black'),
    ]);
    table24.push([
        new Card(4,'blue'),
        new Card(4,'red'),
        new Card(4,'orange'),
        ]);
        const cards24 =new Array();
        cards24.push(
        new Card(4,'black'),
        );
            
const result24 = new Array();
result24.push([
    new Card(4,'blue'),
    new Card(4,'red'),
    new Card(4,'black'),
    ]);
    result24.push([
        new Card(4,'blue'),
        new Card(4,'red'),
        new Card(4,'orange'),
        new Card(4,'black'),
    ]);

test ('plus card 7-orange',()  => {
    expect(plusCard(bank24, table24, cards24)).toEqual(result24);
});

const bank25 =[
    new Card(4,'red'),
    new Card(1,'blue'),
    new Card(8,'blue'),
    new Card(5,'orange'),
    new Card(7,'red'),
    new Card(7,'orange'),
    new Card(4,'blue'),
    new Card(8,'blue'),
    new Card(2,'black'),
    new Card(8,'orange'),
    new Card(4,'black'),
];  

const table25 =[];
    const cards25 =new Array();
    cards25.push(
        new Card(4,'blue'),
        new Card(4,'red'),
            new Card(4,'black'),
    );
        
const result25 = new Array();
result25.push([
new Card(4,'blue'),
new Card(4,'red'),
new Card(4,'black'),
]);
test ('new row vanilla tuple',()  => {
expect(newRow(bank25, table25, cards25)).toEqual(result25);
});
