import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { RowT, RowS, Plus, Middle, Right, Left } from "./option.js";
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



export function findRight(bank, table) {
  const options = new Array();
  if (table.length > 0) {
    let ix;
    let color;
    let valor;
    let overflow = false;
    let cards = new Array();
    for (const row of table) {
      if (row.length < MAX_VALUE) {
        if (row[0].valor != row[1].valor) {
          valor = row[row.length - 1].valor + 1;
          if (valor > MAX_VALUE) valor = valor % MAX_VALUE;
          if (valor == MAX_VALUE) overflow = true;

          color = row[row.length - 1].color;
        }

        if (!row.find((e) => e.valor == valor)) {
          ix = bank.findIndex(
            (element) => element.color == color && element.valor == valor
          );
          if (ix >= 0) {
            cards.push(bank[ix]);
            options.push(new Right(cards, overflow));
          }
        } ix = -1;
        cards = [];
      }
    }
  }
  return options;
}


export function findSplit(bank, table) {
  const options = new Array();
  if (table.length > 0) {
    let ix;
    let color;
    let first;
    let overflow;
    let cards = new Array();
    for (const row of table) {
      if (row[0].valor != row[1].valor) {
        color = row[row.length - 1].color;
        if (row.length >= MIN_SEQUENCE * 2 - 1) {
          first = row.map(x => x.valor);
          for (let pos = MIN_SEQUENCE - 1; pos < row.length - (MIN_SEQUENCE-1); pos++) {
            //find on the bench
            ix = bank.findIndex(
              (element) => element.color == color && element.valor == first[pos]
            );
            if (ix >= 0) {
              cards.push(bank[ix]);
            }
            if(cards.length >0)
            options.push(new Middle(cards, overflow));
            cards = [];
            ix = -1;
      
          }
        }
      }
    }
  }
  return options;
}

export function findLeft(bank, table) {
  const options = new Array();
  if (table.length > 0) {
    let ix;
    let color;
    let valor;
    let cards = new Array();
    for (const row of table) {
      if (row.length < MAX_VALUE) {
        if (row[0].valor != row[1].valor) {
          valor = row[0].valor - 1;
          if (valor == 0) valor = MAX_VALUE;
          color = row[0].color;
        }
        ix = bank.findIndex(
          (element) => element.color == color && element.valor == valor
        );
        if (ix >= 0) {
          cards.push(bank[ix]);
          options.push(new Left(cards));
        }
        ix = -1;
        cards = [];

      }
    }

  }

  return options;
}
/*
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
 findSplit(bank6  ,table6 );*/
/*const bank22 = [new Card(4, 'orange'),
new Card(4, 'red'),
new Card(2, 'blue'),
new Card(2, 'black'),
];
const table22 = new Array();
table22.push([
  new Card(1, 'black'),
  new Card(2, 'black'),
  new Card(3, 'black'),
  new Card(4, 'black'),
]);

table22.push([
  new Card(4, 'black'),
  new Card(5, 'black'),
  new Card(6, 'black'),
  new Card(7, 'black'),
]);

table22.push([
  new Card(7, 'orange'),
  new Card(8, 'orange'),
  new Card(9, 'orange'),
  new Card(1, 'orange'),
  new Card(2, 'orange'),
  new Card(3, 'orange'),
  new Card(4, 'orange'),
]);
const result22 = new Array();

const result = findSplit(bank22, table22);*/