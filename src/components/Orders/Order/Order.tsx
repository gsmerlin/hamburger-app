import * as React from "react";
import IAmounts from "../../../interfaces/IAmounts";
import MainDiv from "./style";

interface Props {
  ingredients: IAmounts;
  price: number;
}

// Simple component for rendering a single order to screen
const Order: React.FC<Props> = (props) => {
  const { ingredients, price } = props;

  const ingredientsOutput = Object.entries(ingredients).map((entry) => {
    const ingredient = entry[0];
    const amount = entry[1];
    return (
      <span
        key={ingredient}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient} ({amount})
      </span>
    );
  });

  return (
    <MainDiv>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        {" "}
        Price: <strong>USD {price}</strong>
      </p>
    </MainDiv>
  );
};

export default Order;
