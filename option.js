export class Option {
    constructor(cards) {
      this.cards = new Array();
      this.valor = 0;
      this.count = 0;
      this.a=1;
      this.b=5;
      this.bias=0;
      this.overflow = false;
      for (let item of cards) {
        this.cards.push(item);
        this.valor += item.valor;
        this.count ++;
      }
    }
    get getCost() {
        return this.a*this.valor+this.b*this.count+this.bias;  
    }
  }
  
  export  class Right extends Option {
    constructor(cards, overflow=false) {
      super(cards);
      super.overflow=overflow;
      this.type = "right";
    }
  }
  
  export class Left extends Option {
    constructor(cards, overflow=false) {
      super(cards);
      super.overflow=overflow
      this.type = "left";
    }
  }
  
  export class RowT extends Option {
    constructor(cards) {
      super(cards);
      this.type = "rowT";
    }
  }
  
  export class RowS extends Option {
    constructor(cards) {
      super(cards);
      this.type = "rowS";
      this.bias = 10;
    }
  }

  export class RowO extends Option {
    constructor(cards) {
      super(cards);
      super.overflow=true;
      this.type = "rowO";
    //  this.bias = 10;
    }
  }
  
  export class Plus extends Option {
    constructor(cards) {
      super(cards);
      this.type = "plus";
    }
  }

  export class Middle extends Option {
    constructor(cards) {
      super(cards);
      this.type = "middle";
    }
  }
  