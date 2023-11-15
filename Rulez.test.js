import { Card} from "./deck.js";
import { ruleValD, ruleColD, ruleMaxS, ruleMinT, ruleOffS } from "./Rulez.js";
import {jest} from '@jest/globals'

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
ruleMaxS.action=jest.fn();

test ('Rulez Row length max sequence',()  => {

    expect(ruleMaxS.check(row30)).toEqual(result30);
    expect(ruleMaxS.action).toHaveBeenCalled();
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
ruleColD.action=jest.fn(n=>true);

test ('Rulez Row color no duplicates',()  => {
    expect(ruleColD.check(row32 )).toEqual(result32);
});

ruleMinT.action=jest.fn(n=>true);

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
ruleValD.action=jest.fn(n=>true);

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

const row37 =[
    new Card(7,'orange'),
new Card(8,'orange'),
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
new Card(4,'orange'),
];
const result37= true;
ruleOffS.action=jest.fn();

test ('Rulez Row sequence offset',()  => {

    expect(ruleOffS.check(row37)).toEqual(result37);
    expect(ruleOffS.action).toHaveBeenCalled();
});
const row38 =[
    new Card(7,'orange'),
new Card(8,'orange'),
new Card(9,'orange'),
new Card(2,'orange'),
new Card(3,'orange'),
new Card(4,'orange'),
];
const result38= false;
ruleOffS.action=jest.fn();

test ('Rulez Row sequence offset',()  => {

    expect(ruleOffS.check(row38)).toEqual(result38);
    expect(ruleOffS.action).toHaveBeenCalled();
});
