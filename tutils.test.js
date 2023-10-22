import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { splitCard} from "./tutils.js";

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

