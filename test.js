import { Card } from "./deck.js";
//4-tuple 1 add 1-red no plus card
export const TestCase1 =[new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(1,'orange'),
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'blue'),
new Card(1,'red'),
new Card(5,'blue'),
new Card(9,'red'),
];

export const TestCase2 =[new Card(1,'red'),
new Card(1,'blue'),
new Card(1,'black'),
new Card(2,'red'),
new Card(3,'red'),
new Card(4,'blue'),
new Card(1,'red'),
new Card(1,'orange'),
new Card(5,'blue'),
new Card(9,'red'),
];



// sequence overflow right
export const TestCase3 =[new Card(6,'red'),
new Card(7,'red'),
new Card(8,'red'),
new Card(2,'orange'),
new Card(3,'red'),
new Card(4,'blue'),
new Card(1,'red'),
new Card(9,'red'),
new Card(2,'red'),
new Card(2,'blue'),
];