import * as React from "react";
import { AuthContext } from "../../../../context/auth-context";
import { BurgerContext } from "../../../../context/burger-context";
import BuildControl from "./BuildControl/BuildControl";
import { MainDiv, OrderButton } from "./style";

interface Props {
  onOrder: () => void;
}

const controls = ["Salad", "Bacon", "Cheese", "Meat"];

const BuildControls: React.FC<Props> = (props) => {
  const { ingredients, getPrc } = React.useContext(BurgerContext);
  const { isAuth } = React.useContext(AuthContext);
  console.log(isAuth);
  const {  onOrder } = props;
  const price = getPrc();
  return (
    <MainDiv>
      <p>
        Current Price: <strong>{price}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl key={ctrl} label={ctrl} />
      ))}
      <OrderButton disabled={ingredients.length <= 0} onClick={onOrder}>
        {isAuth ? "Order Now!" : "Sign up to order!"}
      </OrderButton>
    </MainDiv>
  );
};

export default BuildControls;
