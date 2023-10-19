export class Option {
    constructor(cards) {
      this.cards = new Array();
      this.valor = 0;
      this.count = 0;
      this.overflow = false;
      for (let item of cards) {
        this.cards.push(item);
        this.valor += item.valor;
        this.count ++;
      }
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
    constructor(cards) {
      super(cards);
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
  