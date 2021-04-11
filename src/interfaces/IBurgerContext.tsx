import IAmounts from "./IAmounts";

interface IBurgerContext {
  ingredients: string[];
  getPrc: () => number;
  getAmts: () => IAmounts;
  clearIngs: () => void;
  getAmt: (ingredient: string) => number;
  addIng: (ingredient: string) => void;
  delIng: (ingredient: string) => void;
}

export default IBurgerContext;