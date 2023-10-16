import { Card, MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import { Row, Plus} from "./option.js";
/**
* find a tuple of caads on player#ss bank.
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
        options.push(new Row(collector));
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