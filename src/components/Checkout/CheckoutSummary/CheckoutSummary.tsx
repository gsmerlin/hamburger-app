import * as React from "react";
import Burger from "../../BurgerBuilder/Burger/Burger";
import MainDiv from "./style";


// Simple checkout summary rendering burger to screen
const CheckoutSummary: React.FC = () => (
  <MainDiv>
    <h1>We hope it tastes great!</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger />
    </div>
  </MainDiv>
);

export default CheckoutSummary;
