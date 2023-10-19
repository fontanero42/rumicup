import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { RowT, RowS, Plus, Middle} from "./option.js";
/**
* find a tuple of cards on player's bank.
* @generator
* @function findTuple
* @param bank 
* @yields {yieldDataType} Brief description of yielded items here.
*/
export function findTuple(bank) {
    const options = new Array();
    const tuple = new Array(MAX_VALUE + 1);
    let second;
    let third;
    const collector = new Set();
    for (let n = 1; n < MAX_VALUE + 1; n++) {
      second = bank.filter((element) => element.valor == n);
      third = second.map((element) => element.color);
      //distinct
      tuple[n] = [...new Set(third)];
      if (tuple[n].length >= TUPPLE_THRESHOLD) {
        for (const t of tuple[n]) {
          collector.add(
            bank.find(
              (element) => element.color == t && element.valor == n
            )
          );
        }
        options.push(new RowT(collector));
        collector.clear();
      }
    }
    return options;
  }

export function findPlus(bank, table) {
    const options = new Array();
    if (table.length > 0) {
      let ix;
      let valor;
      let cards = new Array();
      let difference = new Set();
      for (const row of table) {
        if (row[0].valor == row[1].valor) {
          valor = row[0].valor;
          const exists = new Set();
          for (const card of row) {
            exists.add(card.color);
          }
          difference = new Set(
            [...Card.allColors].filter((x) => !exists.has(x))
          );
        }
        //look for card on bank
        for (const item of difference) {
          ix = bank.findIndex(
            (element) => element.color == item && element.valor == valor
          );
          if (ix >= 0) {
            cards.push(bank[ix]);
            options.push(new Plus(cards));
          }
        }
        ix = -1;
        cards = [];
        difference.clear();
      }
    }

    return options;
  }


export function findSplit(bank, table) {
  const options = new Array();
  if (table.length > 0) {
    let ix;
    let color;
    let min;
    let max;
    let first;
    let overflow;
    let cards = new Array();
    for (const row of table) {
      if (row[0].valor != row[1].valor) {
        color = row[row.length - 1].color;
        if (row.length >= MIN_SEQUENCE * 2 - 1) {
          first = row.map(x => x.valor);
          max = Math.max(...first);
          min = Math.min(...first);
          for (const item of first) {
            if (item - min >= MIN_SEQUENCE-1 && max - item >= MIN_SEQUENCE-1) {
              //fin on the bencch
              ix = bank.findIndex(
                (element) => element.color == color && element.valor == item
              );
              if (ix >= 0) {
                cards.push(bank[ix]);
                options.push(new Middle(cards, overflow));
              }
            }
          }
        }
      }
      ix = -1;
      cards = [];
    }
  }
  return options;
}
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
 findSplit(bank6  ,table6 );