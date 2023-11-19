import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";

export function newCombo(bank, table, cards) {
  const newRow = new Array();
  for (const card of cards) {
    if(card.imagine == true) {
      newRow.push(card);
      fromTable(card, table);
    } else {
      newRow.push(card);
      fromBank(card, bank);
    }
  }
  table.push(newRow);
  normTable(table);
  return table;
}
export function normTable(table){
  for (const row of table) {
    for (const card of row) {
    card.imagine=undefined;
  }
  }
}
export function fromTable (card, table){
  let ix;
  for (const row of table) {
    if (row[0].valor != row[1].valor) {
      if (row.length > MIN_SEQUENCE) {
        ix=row.indexOf(card);

      }
    }
    if (row[0].valor == row[1].valor) {
      if (row.length > TUPPLE_THRESHOLD) {
        ix=row.indexOf(card);
      }
    }
    if(ix>=0){
      card=row.splice(ix, 1);
//      console.log(card);
      return card;
    }
  }
debugger
  return null;  
}
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

  export function joinCard(bank, table, cards, type) {
    const color = cards[0].color;
    for (const row of table) {
      if (row[0].valor != row[1].valor) {
        if (row[0].color == color) {
          // ToDo check forrr duplicatee rrrow
          if (row.length < MAX_VALUE) {
            if (checkRow(type, row, cards[0])) {
              fromBank(cards[0],bank);
              return table;
            }
          }
        }
      }
    }
    return table;
  }

  export function checkRow(type, row, card) {
    if (type == 'right') {
      if (row[row.length - 1].valor % MAX_VALUE == card.valor - 1) {
        row.push(card);
        return true;
      }
    } else {
      if (card.valor % MAX_VALUE == row[0].valor - 1) {
        row.unshift(card);
        return true;
      }
    }
    return false;
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
    

export function fromBank(card, bank) {
  let i;
  /**i = bank.findIndex(
    (element) => element.color == card.color && element.valor == card.valor
  );*/
  i = bank.indexOf(card);
  bank.take(i, 1);
  return i;
}
