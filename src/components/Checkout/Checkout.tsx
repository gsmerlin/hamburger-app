import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import Button from "../UI/Button/Button";
import CheckoutSummary from "./CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

// Simple container for handling checkout
const Checkout: React.FC<RouterProps> = (props) => {
  const [renderContactData, setRenderContactData] = React.useState(false);

  const onContinueHandler = () => {
    setRenderContactData(true);
  };

  const onCancelHandler = () => {
    setRenderContactData(false);
    props.history.goBack();
  };

  const contactData = renderContactData ? <ContactData /> : null;
  return (
    <div>
      <CheckoutSummary></CheckoutSummary>
      {renderContactData ? null : (
        <>
          <Button btnClass="No" onClick={onCancelHandler}>
            Cancel
          </Button>
          <Button btnClass="Yes" onClick={onContinueHandler}>
            Continue
          </Button>
        </>
      )}
      {contactData}
    </div>
  );
};

export default withRouter(Checkout);
