import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import { BurgerContext } from "../../context/burger-context";
import { OrderContext } from "../../context/order-context";
import Modal from "../UI/Modal/Modal";
import BuildControls from "./Burger/BuildControls/BuildControls";
import Burger from "./Burger/Burger";
import OrderSummary from "./Burger/OrderSummary/OrderSummary";

// Main burger-builder container
const BurgerBuilder: React.FC<RouterProps> = (props) => {
  const [purchasing, setPurchasing] = React.useState(false);
  const { getAmts, clearIngs } = React.useContext(BurgerContext);
  const { updIngs } = React.useContext(OrderContext);
  React.useEffect(() => clearIngs(), []);
  const cancelHandler = () => setPurchasing(false);
  const purchaseHandler = () => {
    updIngs(getAmts()); // Adds chosen ingredients to order context
    props.history.push("/checkout");
  };
  const orderHandler = () => setPurchasing(true);
  return (
    <>
      <Modal show={purchasing} onClick={purchaseHandler}>
        <OrderSummary
          onCancel={cancelHandler}
          onContinue={purchaseHandler}
        ></OrderSummary>
      </Modal>
      <Burger />
      <BuildControls onOrder={orderHandler} />
    </>
  );
};

export default withRouter(BurgerBuilder);
