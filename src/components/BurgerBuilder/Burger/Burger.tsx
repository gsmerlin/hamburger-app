import * as React from "react";
import { BurgerContext } from "../../../context/burger-context";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import Div from "./style";

// Renders full burger to screen whenever called
const Burger: React.FC = () => {
  const { ingredients } = React.useContext(BurgerContext);
  const ingredientList =
    ingredients.length === 0 ? (
      <p>Please start adding ingredients!</p>
    ) : (
      ingredients.map((ingredient: string, index: number) => (
        <BurgerIngredient key={ingredient + index} ingredient={ingredient} />
      ))
    );
  return (
    <Div>
      <BurgerIngredient ingredient="BreadTop" />
      {ingredientList}
      <BurgerIngredient ingredient="BreadBottom" />
    </Div>
  );
};

export default Burger;
