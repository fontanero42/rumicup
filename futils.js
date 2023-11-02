import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { RowT, RowS, RowO, Plus, Middle, Right, Left } from "./option.js";
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
    let overflow  = false;
    let cards = new Array();
    for (const row of table) {
      if (row.length < MAX_VALUE) {
        if (row[0].valor != row[1].valor) {
          valor = row[0].valor - 1;
          if (valor == 0) {
            valor = MAX_VALUE;
            overflow =true;
          }
          color = row[0].color;
        }
        ix = bank.findIndex(
          (element) => element.color == color && element.valor == valor
        );
        if (ix >= 0) {
          cards.push(bank[ix]);
          options.push(new Left(cards, overflow));
        }
        ix = -1;
        cards = [];

      }
    }

  }

  return options;
}


export function findSequence(bank) {
  const options = new Array();
  let collector = new Array();
  //sort by color and add sequentially
  for (const color of Card.allColors) {
    for (let i = 0; i < MAX_VALUE + 1; i++) {
      for (const card of bank) {
        if (color == card.color) {
          if (i == card.valor) {
            collector.push(i);
          }
        }
      }
    }
    //check for gaps
    
    const result = collector.reduce(
        (seq, v, i, a) => {
          if (i && a[i - 1] !== v - 1) {
            seq.push([]);
          }
          seq[seq.length - 1].push(v);
          return seq;
        },
        [[]]
      )
      .filter(({ length }) => length > MIN_SEQUENCE - 1);
    //console.log(result);
    //assemble options
    let ix;
    let cards = new Array();
    for (const outer of result) {
      for (const inner of outer) {
        ix = bank.findIndex(
          (element) => element.color == color && element.valor == inner
        );
        cards.push(bank[ix]);
      }
      options.push(new RowS(cards));
      cards = [];
    }
    collector = [];
  }
  return options;
}

export function findOverflow(bank) {
  const options = new Array();
  let collector = new Array();
  let cards = new Array();
  let ix = null;
  //sort by color and add sequentially
  for (const color of Card.allColors) {
    let first = bank.filter(item => item.color == color);
    let second = first.map(item => item.valor);
    if (second.includes(MAX_VALUE) && second.includes(1)) {
      collector.push(MAX_VALUE);
      collector.push(1);
      for (let n = 2; n < MIN_SEQUENCE; n++) {
        if (second.includes(n))
          collector.push(n);
        else
          break;
      }
    }
    if (collector.length >= MIN_SEQUENCE) {
      for (const item of     collector) {
        ix = bank.findIndex(
          (element) => element.color == color && element.valor == item);
        cards.push(bank[ix]);
      }
      console.log(cards);
      options.push(new RowO(cards));
      collector=[];
      cards = [];
    }
  }
  return options;
}