import { Card } from "./deck.js";
import { joinCard, newRow, plusCard, splitCard} from "./tutils.js";
import {jest} from '@jest/globals';

const c10=new Card(2,'red');
const c11=new Card(3,'red');
const c12=new Card(4,'red');
const c13=new Card(5,'red');
const c14=new Card(6,'red');
const c15=new Card(7,'red');
const c16=new Card(8,'red');
const c17=new Card(9,'red');
const c18=new Card(5,'red');

const bank6 =[new Card(1,'orange'),
new Card(1,'red'),
c18,
new Card(4,'blue'),
new Card(9,'black'),
new Card(9,'blue'),
new Card(9,'red')
];
const table6 =new Array();
table6.push([c10,c11,c12,c13,c14,c15,c16,c17]);
const cards6 =new Array();
cards6.push(c18);
const result6 = new Array();
result6.push([c10,c11,c12,c13]);
result6.push([c18,c14,c15,c16,c17]);

test ('split card 5-red for sequence 2-9.red ',()  => {
    bank6.take= jest.fn();
    expect(splitCard(bank6, table6, cards6)).toEqual(result6);
    expect(bank6.take).toHaveBeenCalledWith(2,1);
});
const c30 =new Card(7,'orange');
const c31 =new Card(8,'orange');
const c32 =new Card(9,'orange');
const c33 =new Card(1,'orange');
const c34 =new Card(2,'orange');
const c35 =new Card(3,'orange');
const c36 =new Card(4,'orange');
const c25 =new Card(4,'black');
const c26 =new Card(5,'black');
const c27 =new Card(6,'black');
const c28 =new Card(7,'black');
const c20 =new Card(1,'black');
const c21 =new Card(2,'black');
const c22 =new Card(3,'black');
const c23 =new Card(4,'black');
const c37 =new Card(9,'orange');


const bank22 =[new Card(4,'orange'),
c37,
new Card(1,'orange'),
new Card(2,'orange'),
new Card(4,'red'),
new Card(2,'blue'),
new Card(2,'black'),
];
const table22 =new Array();
table22.push([c20,c21,c22,c23]);

table22.push([c25,c26,c27,c28]);
    
table22.push([c30,c31,c32,c33,c34,c35,c36]);
const cards22 =new Array();
cards22.push(c37);
const result22 = new Array();
result22.push([c20,c21,c22,c23]);
result22.push([c25,c26,c27,c28]);

result22.push([c30,c31,c32]);
result22.push([c37,c33,c34,c35,c36]);
test ('split card ',()  => {
    bank22.take= jest.fn();
    expect(splitCard(bank22, table22, cards22)).toEqual(result22);
    expect(bank22.take).toHaveBeenCalledWith(1,1);
});
const c50=new Card(8,'orange');
const c51=new Card(9,'orange');
const c52=new Card(1,'orange');
const c53=new Card(2,'orange');
const c54=new Card(3,'orange');
const c55=new Card(4,'orange');
const c56=new Card(7,'red');
const c57=new Card(7,'blue');
const c58=new Card(7,'black');
const c59=new Card(7,'orange');
const c45=new Card(1,'black');
const c46=new Card(2,'black');
const c47=new Card(3,'black');
const c48=new Card(4,'black');

const bank23 =[c59,
new Card(9,'orange'),
new Card(1,'orange'),
new Card(2,'orange'),
new Card(4,'red'),
new Card(2,'blue'),
new Card(7,'orange'),
new Card(2,'black'),
];
const table23 =new Array();
table23.push([c45,c46,c47,c48]);
table23.push([c56,c57,c58]);
table23.push([c50,c51,c52,c53,c54,c55]);
const cards23 =new Array();
cards23.push(c59);
const result23 = new Array();
result23.push([c45,c46,c47,c48]);
result23.push([c56,c57,c58,c59]);
result23.push([c50,c51,c52,c53,c54,c55]);
    test ('plus card 7-orange',()  => {
        bank23.take= jest.fn();
        expect(plusCard(bank23, table23, cards23)).toEqual(result23);
        expect(bank23.take).toHaveBeenCalledWith(0,1);
});
const c60=new Card(4,'blue');
const c61=new Card(4,'red');
const c62=new Card(4,'orange');
const c63=new Card(4,'black');
const c64=new Card(4,'blue');
const c65=new Card(4,'red');
const c66=new Card(4,'black');

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
        c63,
      ];
            

  const table24 =[];
  table24.push([c64,c65,c66]);
    table24.push([c60,c61,c62]);
        const cards24 =new Array();
        cards24.push(c63);
            
const result24 = new Array();
result24.push([c64,c65,c66]);
    result24.push([c60,c61,c62,c63]);

test ('plus card 4-black 2xtuple ',()  => {
    bank24.take= jest.fn();
    expect(plusCard(bank24, table24, cards24)).toEqual(result24);
    expect(bank24.take).toHaveBeenCalledWith(10,1);
});
const c70=new Card(4,'blue');
const c71=new Card(4,'red');
const c72=new Card(4,'black');

const bank25 =[
    c71,
    new Card(1,'blue'),
    new Card(8,'blue'),
    new Card(5,'orange'),
    new Card(7,'red'),
    new Card(7,'orange'),
    c70,
    new Card(8,'blue'),
    new Card(2,'black'),
    new Card(8,'orange'),
    c72,
];  

const table25 =[];
    const cards25 =new Array();
    cards25.push(c70,c71, c72 );
        
const result25 = new Array();
result25.push([c70,c71, c72]);
test ('new row vanilla tuple',()  => {
    bank25.take= jest.fn();
    expect(newRow(bank25, table25, cards25)).toEqual(result25);
    expect(bank25.take).toHaveBeenCalledTimes(3);
});
const c80=new Card(3,'red');
const c81=new Card(4,'red');
const c82=new Card(5,'red');
const c83=new Card(6,'red');

const bank26 =[
    new Card(4,'red'),
    new Card(1,'blue'),
    new Card(8,'blue'),
    new Card(5,'orange'),
    c80,
    new Card(7,'orange'),
    new Card(4,'blue'),
    new Card(8,'blue'),
    new Card(2,'black'),
    new Card(8,'orange'),
    new Card(4,'black'),
];  

const table26 =[];
table26.push([c81,c82,c83]);
    
const cards26 =[c80];
        
const result26 = new Array();
result26.push([c80,c81,c82,c83]);
test ('join card left 3-6.red',()  => {
    bank26.take= jest.fn();
    expect(joinCard(bank26, table26, cards26, 'left')).toEqual(result26);
    expect(bank26.take).toHaveBeenCalledWith(4,1);
});
const c90=new Card(4,'red');
const c91=new Card(5,'red');
const c92=new Card(6,'red');
const c93=new Card(7,'red');

const bank27 =[
    new Card(4,'red'),
    new Card(1,'blue'),
    new Card(8,'blue'),
    new Card(5,'orange'),
    c93,
    new Card(7,'orange'),
    new Card(4,'blue'),
    new Card(8,'blue'),
    new Card(2,'black'),
    new Card(8,'orange'),
    new Card(4,'black'),
];  

const table27 =[];
table27.push([
c90,c91,c92]);
    
const cards27 =[
c93];
        
const result27 = new Array();
result27.push([c90,c91,c92,c93]);
test ('join card right 4-7.red',()  => {
    bank27.take= jest.fn();
    expect(joinCard(bank27, table27, cards27, 'right')).toEqual(result27);
    expect(bank27.take).toHaveBeenCalledWith(4,1);
});
const c100=new Card(3,'red');
const c101=new Card(4,'red');
const c102=new Card(5,'red');
const c103=new Card(6,'red');
const bank28 =[
    new Card(4,'red'),
    new Card(1,'blue'),
    new Card(8,'blue'),
    new Card(5,'orange'),
    c100,
    new Card(7,'orange'),
    new Card(4,'blue'),
    new Card(8,'blue'),
    new Card(2,'black'),
    new Card(8,'orange'),
    new Card(4,'black'),
];  

const table28 =[];
table28.push([
c101,
c102,
c103,
]);
    
const cards28 =[c100];
        
const result28 = new Array();
result28.push([
    c100,c101,c102,c103
]);
test ('join card left 3-6.red',()  => {
    bank28.take= jest.fn();
    expect(joinCard(bank28, table28, cards28, 'left')).toEqual(result28);
    expect(bank28.take).toHaveBeenCalledWith(4,1);
});
