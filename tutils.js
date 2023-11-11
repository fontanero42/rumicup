import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";

export function newRow(bank, table, cards) {
  const row = new Array();
  for (const card of cards) {
    fromBank(card, bank);
    row.push(card);
  }
  table.push(row);
  return table;
}

export function plusCard(bank, table, cards) {
  const valor = cards[0].valor;
  for (const row of table) {
    if (row[0].valor == row[1].valor) {
      if (row[0].valor == valor) {
        if (row.length < Card.allColors.length) {
          if (! row.map(it => it.color).includes(cards[0].color)) {
            row.push(cards[0]);
            fromBank(cards[0], bank);
            return table;
          }
        }
      }
    }
  }
  //return this.gstate.hand.bank.length;
  return table;
}

export function splitCard(bank, table, cards ) {
    const color = cards[0].color;
    const valor = cards[0].valor;
    let ix;
    let second;
    for (const row of table) {
      if (row[0].valor != row[1].valor) {
        if (row[0].color == color) {
          // ToDo check for duplicate row
            if(hasDuplicate(table,cards[0]))  
              console.log("!!!Duplicates!!");
            ix = row.findIndex((el)=>el.color==color && el.valor==valor);
            if(ix >0){
               second   = row.toSpliced(0,ix+1);
               second.unshift(cards[0]);
               table.push(second);
               row.splice(ix+1   ,row.length-ix-1 );
               fromBank(cards[0],bank);
               return table ;
            }
        }
      }
    }
    return table;
  }

export function hasDuplicate(table, card) {
  let i = 0;
  for (const row of table) {
    if (row.find((e) => e.valor == card.valor && e.color == card.color)) i++;
  }
  if (i > 1) return true;
  else
    return false;
}
    

function      fromBank(card, bank) {
      let i;
      i = bank.findIndex(
        (element) => element.color == card.color && element.valor == card.valor
      );
 //     i = bank.indexOf(card);
      //bank.take(i, 1);
      bank.splice(i, 1);
      return i;
    }
/**const bank =[new Card(1,'orange'),
    new Card(6,'red'),
    new Card(2,'red'),
    new Card(7,'red'),
    new Card(2,'black'),
    new Card(9,'red')
    ];
    const table =new Array();
    table.push([
    new Card(9,'black'),
    new Card(1,'black'),
    new Card(2,'black'),
    new Card(3,'black'),
    new Card(4,'black'),
    ]);
    const cards=new Array();
    cards.push(
    new Card(2,'black'),
    );
    const result= splitCard(bank, table, cards ) ;

/*
const bank22 =[new Card(4,'orange'),
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
new Card(4,'orange'),
);
const result= splitCard(bank22, table22, cards22 ) ;
*/