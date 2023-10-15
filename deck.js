const cards = [
  "1-red",
  "2-red",
  "3-red",
  "4-red",
  "5-red",
  "6-red",
  "7-red",
  "8-red",
  "9-red",
  "1-black",
  "2-black",
  "3-black",
  "4-black",
  "5-black",
  "6-black",
  "7-black",
  "8-black",
  "9-black",
  "1-blue",
  "2-blue",
  "3-blue",
  "4-blue",
  "5-blue",
  "6-blue",
  "7-blue",
  "8-blue",
  "9-blue",
  "1-orange",
  "2-orange",
  "3-orange",
  "4-orange",
  "5-orange",
  "6-orange",
  "7-orange",
  "8-orange",
  "9-orange",
  "1-red",
  "2-red",
  "3-red",
  "4-red",
  "5-red",
  "6-red",
  "7-red",
  "8-red",
  "9-red",
  "1-black",
  "2-black",
  "3-black",
  "4-black",
  "5-black",
  "6-black",
  "7-black",
  "8-black",
  "9-black",
  "1-blue",
  "2-blue",
  "3-blue",
  "4-blue",
  "5-blue",
  "6-blue",
  "7-blue",
  "8-blue",
  "9-blue",
  "1-orange",
  "2-orange",
  "3-orange",
  "4-orange",
  "5-orange",
  "6-orange",
  "7-orange",
  "8-orange",
  "9-orange",
];

export const MAX_VALUE = 9;
const INITIAL_BANK =7;
export const TUPPLE_THRESHOLD = 3;
export const MIN_SEQUENCE = 3;

export function factory() {
  const d1 = new Array();
  let position;
  let m = 0;
  for (const item of cards) {
    do {
      position = Math.floor(Math.random() * cards.length);
      m++;
    } while (d1[position] != undefined);
    d1[position] = new Card(item.split("-")[0], item.split("-")[1]);
  }

  console.log(`trials ${m}`);
  d1.draw = function(){
    let card;
    if(d1.length>0){
      card=d1.shift();
      if(d1.length==0)
     d1.callback();
    }
    return card;

  }

  d1.register = function(cb){
    this.callback = cb;
  }
  return d1;
}

export class Card {
  constructor(valor, color) {
    this.valor = parseInt(valor);
    this.color = color;
  }

  toString() {
    return `| ${this.valor}-${this.color}`;
  }

  equals(card) {
    return this.color == card.color && this.valor == card.valor;
  }

  static allColors = ["red", "blue", "black", "orange"];
}

