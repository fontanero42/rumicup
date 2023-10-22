import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";


export function splitCard(bank, table, cards ) {
    const color = cards[0].color;
    const valor = cards[0].valor;
    let ix;
    let second;
    for (const row of table) {
      if (row[0].valor != row[1].valor) {
        if (row[0].color == color) {
          // ToDo check forrr duplicatee rrrow
            ix = row.findIndex((el)=>el.color==color && el.valor==valor);
            if(ix >0){
               second   = row.toSpliced(0,ix+1);
               second.unshift(cards[0]);
               table.push(second);
               row.splice(ix+1   ,row.length-ix-1 );
            }
          fromBank(cards[0],bank);
            return table ;
        }
      }
    }
    return table;
  }


    

function      fromBank(card, bank) {
      let i;
      i = bank.indexOf(card);
      //bank.take(i, 1);
      bank.splice(i, 1);
      return i;
    }
    const bank =[new Card(1,'orange'),
    new Card(5,'red'),
    new Card(1,'red'),
    new Card(4,'blue'),
    new Card(9,'black'),
    new Card(9,'blue'),
    new Card(9,'red')
    ];
    const table =new Array();
    table.push([
    new Card(2,'red'),
    new Card(3,'red'),
    new Card(4,'red'),
    new Card(5,'red'),
    new Card(6,'red'),
    new Card(7,'red'),
    new Card(8,'red'),
    new Card(9,'red'),
    ]);
    const cards=new Array();
    cards.push(
    new Card(5,'red'),
    );

const result= splitCard(bank, table, cards ) ;
