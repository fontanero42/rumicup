import { MAX_VALUE, MIN_SEQUENCE, TUPPLE_THRESHOLD } from "./deck.js";
import {logger} from "./logger.js";

export function createRule(name) {
  let rule = Object.create(null);
  rule.name = name;
  rule.isValid = true;
  rule.register = function (cb){
    rule.callback = cb;
  }

  rule.action = function () {
    if (!this.isValid){
      this.callback(this.name);
      logger.error(this.name + "trigger");
    }
  }
  return rule;
}

export const ruleMinS = createRule('MinimumSequence');

export const ruleMinT = createRule('MinimumTupple');

export const ruleMaxS = createRule('MaximumSequence');

export const ruleColD = createRule('ColorDuplicate');

export const ruleValD = createRule('ValorDuplicate');

export const rulez = function (table) {
  for (const row of table) {
    ruleMinS.check(row);
    ruleMaxS.check(row);
    ruleMinT.check(row);
    ruleColD.check(row);
    ruleValD.check(row);
  }
}
export const rulezInit=function(cb) {
  ruleMinS.register(cb);
  ruleMaxS.register(cb);
  ruleMinT.register(cb);
  ruleColD.register(cb);
  ruleValD.register(cb);
}

ruleMinS.check = function (row) {
  if (row.length < MIN_SEQUENCE) {
    if (row[0].color == row[1].color)
      ruleMinS.isValid = false;
  }
  ruleMinS.action();
  return ruleMinS.isValid;
}

ruleMaxS.check = function (row) {
  if (row.length > MAX_VALUE) {
    if (row[0].color == row[1].color)
      ruleMaxS.isValid = false;
  }
  ruleMaxS.action();
  return ruleMaxS.isValid;
}


ruleMinT.check = function (row) {
  if (row.length < TUPPLE_THRESHOLD) {
    if (row[0].valor == row[1].valor)
      ruleMinT.isValid = false;
  }
  ruleMinT.action();
  return ruleMinT.isValid;
}

ruleColD.check = function (row) {
  if (row[0].valor == row[1].valor) {
    let colors = [...new Set(row.map((e) => e.color))]
    if (colors.length != row.length)
      ruleColD.isValid = false;
  }
  ruleColD.action();
  return ruleColD.isValid;
}

ruleValD.check = function (row) {
  if (row[0].color == row[1].color) {
    let valors = [...new Set(row.map((e) => e.valor))]
    if (valors.length != row.length)
      ruleValD.isValid = false;
  }
  ruleValD.action();
  return ruleValD.isValid;
}
