import * as React from "react";
import { BurgerContext } from "../../../../context/burger-context";
import Button from "../../../UI/Button/Button";

interface Props {
  onCancel: () => void;
  onContinue: () => void;
}

// Simple modal that displays order summary to screen
const OrderSummary: React.FC<Props> = (props) => {
  const { getAmts, getAmt, getPrc } = React.useContext(BurgerContext);
  const { onCancel, onContinue } = props;
  const amounts = getAmts();
  const price = getPrc();

  const ingredientSummary = Object.keys(amounts).map((key) => (
    <li key={key}>
      <span style={{ textTransform: "capitalize" }}>{key}</span>: {getAmt(key)}
    </li>
  ));

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious hamburger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {price}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnClass="No" onClick={onCancel}>
        Cancel
      </Button>
      <Button btnClass="Yes" onClick={onContinue}>
        Continue
      </Button>
    </>
  );
};

export default OrderSummary;
