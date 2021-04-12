import * as React from "react";
import Div from "./style";

interface Props {
  ingredient: string;
}

// Ingredient rendering component
const BurgerIngredient: React.FC<Props> = (props) => {
  const { ingredient } = props;
  return ingredient === "BreadTop" ? (
    <Div className="BreadTop">
      <Div className="Seeds1" />
      <Div className="Seeds2" />
    </Div>
  ) : (
    <Div className={ingredient} />
  );
};

export default BurgerIngredient;
