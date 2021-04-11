import * as React from "react";
import IAmounts from "../interfaces/IAmounts";
import IBurgerContext from "../interfaces/IBurgerContext";

export const BurgerContext: React.Context<IBurgerContext> = React.createContext<IBurgerContext>(
  {
    ingredients: [],
    getAmts: () => ({ salad: 0, bacon: 0, cheese: 0, meat: 0 }),
    getPrc: () => 0,
    getAmt: () => 0,
    clearIngs: () => null,
    addIng: () => null,
    delIng: () => null,
  }
);

const BurgerContextProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;
  const [ingredients, setIngredients] = React.useState<string[]>([]);

  const clearIngs = () => setIngredients([]);

  const getAmts = () => {
    const amounts: IAmounts = { salad: 0, bacon: 0, cheese: 0, meat: 0 };
    ingredients.forEach((ingredient) => {
      switch (ingredient.toLowerCase()) {
        default:
          amounts.salad += 1;
          break;
        case "bacon":
          amounts.bacon += 1;
          break;
        case "cheese":
          amounts.cheese += 1;
          break;
        case "meat":
          amounts.meat += 1;
          break;
      }
    });
    return amounts;
  };

  const getAmt = (ingredient: string) => {
    const amounts = getAmts();
    switch (ingredient.toLowerCase()) {
      default:
        return amounts.salad;
      case "bacon":
        return amounts.bacon;
      case "cheese":
        return amounts.cheese;
      case "meat":
        return amounts.meat;
    }
  };

  const getPrc = () => {
    let price = 4;
    ingredients.forEach((ingredient) => {
      switch (ingredient.toLowerCase()) {
        default:
          price += 0.5; // Salad
          break;
        case "bacon":
          price += 1;
          break;
        case "cheese":
          price += 1.5;
          break;
        case "meat":
          price += 2;
          break;
      }
    });
    return price;
  };
  const addIng = (newIng: string) => {
    setIngredients((prevIngs) => [...prevIngs, newIng]);
  };

  const delIng = (ingredient: string) => {
    const indexOf = ingredients.findIndex((item) => item === ingredient);
    if (indexOf > -1) {
      setIngredients(ingredients.filter((_, index) => index !== indexOf));
    }
  };

  const context: IBurgerContext = {
    ingredients,
    getPrc,
    getAmts,
    getAmt,
    clearIngs,
    addIng,
    delIng,
  };

  return (
    <BurgerContext.Provider value={context}>{children}</BurgerContext.Provider>
  );
};

export default React.memo(BurgerContextProvider);
