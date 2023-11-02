import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { ruleValD, ruleColD, ruleMaxS, ruleMinT } from "./Rulez.js";

const row30 =[
    new Card(7,'orange'),
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
new Card(4,'orange'),
];
const result30 = true;

test ('Rulez Row length max sequence',()  => {
    expect(ruleMaxS.check(row30)).toEqual(result30);
});

const row31 =[
    new Card(7,'orange'),
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
new Card(4,'orange'),
new Card(5,'orange'),
new Card(6,'orange'),
new Card(7,'orange'),
];
const result31 = false;

test ('Rulez Row length > max sequence',()  => {
    expect(ruleMaxS.check(row31)).toEqual(result31);
});

const row32 =[
    new Card(7,'orange'),
new Card(7,'red'),
new Card(7,'blue'),
new Card(7,'black'),
];
const result32 = true;

test ('Rulez Row color no duplicates',()  => {
    expect(ruleColD.check(row32 )).toEqual(result32);
});
test ('Rulez Row lemgth > min tupple',()  => {
    expect(ruleMinT.check(row32 )).toEqual(result32);
});

const row33 =[
    new Card(7,'orange'),
new Card(7,'red'),
new Card(7,'blue'),
new Card(7,'black'),
new Card(7,'red'),
];
const result33 = false;

test ('Rulez Row color no duplicates',()  => {
    expect(ruleColD.check(row33 )).toEqual(result33);
});


const row34 =[
    new Card(7,'orange'),
new Card(7,'red'),
];
const result34 = false;

test ('Rulez Row lemgth < min tupple',()  => {
    expect(ruleMinT.check(row34 )).toEqual(result34);
});
const row35 = [
new Card(7,'orange'),
new Card(7,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(7,'orange'),
];
const result35 = false;

test ('Rulez Valor Duplicate triple 7-orange',()  => {
    expect(ruleValD.check(row35)).toEqual(result35 );
});


const row36 =[
    new Card(7,'orange'),
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(7,'orange'),
];
const result36 = false;

test ('Rulez Valor Duplicate 7-orange',()  => {
    expect(ruleValD.check(row36)).toEqual(result36);
});
/**
test ('Rulez Row lemgth < min tupple',()  => {
    expect(ruleMinT.check(row35 )).toEqual(result34);
});*/