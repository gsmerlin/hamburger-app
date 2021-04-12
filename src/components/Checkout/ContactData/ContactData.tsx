import * as React from "react";
import { RouterProps, withRouter } from "react-router";
import firebase from "../../../axios";
import { AuthContext } from "../../../context/auth-context";
import { BurgerContext } from "../../../context/burger-context";
import IElementOptions from "../../../interfaces/IElementOptions";
import IInputElement from "../../../interfaces/IInputElement";
import IInputElements from "../../../interfaces/IInputElements";
import checkValidity from "../../../utils/checkvalidity";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import MainDiv from "./style";

// Main contact information handling container
const ContactData: React.FC<RouterProps> = (props) => {
  const createElement = (
    elementType: string,
    type = "",
    placeholder = "",
    options: IElementOptions[] = [],
    value = "",
    required = false,
    isEmail = false,
    isNumeric = false,
    minLength = 0,
    maxLength = 0,
    valid = false,
    touched = false
  ) => {
    const inputElement: IInputElement = {
      elementType,
      elementConfig: {
        type,
        placeholder,
        options,
      },
      value,
      validation: {
        required,
        isEmail,
        isNumeric,
        minLength,
        maxLength,
      },
      valid,
      touched,
    };
    return inputElement;
  };

  // Creates input elements to display on screen
  const createElements = () => {
    const elements = {
      fullName: createElement("input", "text", "Name", [], "", true),
      address: createElement("input", "text", "Address", [], "", true),
      addressNumber: createElement(
        "input",
        "text",
        "Address Number",
        [],
        "",
        true,
        false,
        true
      ),
      postalCode: createElement("input", "text", "Postal Code", [], "", true),
      phone: createElement("input", "text", "Phone Number", [], "", true),
      delivery: createElement(
        "select",
        "",
        "",
        [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
        "fastest",
        false,
        false,
        false,
        0,
        0,
        true
      ),
    };
    return elements;
  };

  const [orderForm, setOrderForm] = React.useState<IInputElements>(
    createElements()
  );

  // Handles changes to input elements
  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      default:
        return;
      case "fullName":
        setOrderForm({
          ...orderForm,
          fullName: {
            ...orderForm.fullName,
            value: event.target.value,
            touched: true,
          },
        });
        break;
      case "address":
        setOrderForm({
          ...orderForm,
          address: {
            ...orderForm.address,
            value: event.target.value,
            touched: true,
          },
        });
        break;
      case "addressNumber":
        setOrderForm({
          ...orderForm,
          addressNumber: {
            ...orderForm.addressNumber,
            value: event.target.value,
            touched: true,
          },
        });
        break;
      case "postalCode":
        setOrderForm({
          ...orderForm,
          postalCode: {
            ...orderForm.postalCode,
            value: event.target.value,
            touched: true,
          },
        });
        break;
      case "phone":
        setOrderForm({
          ...orderForm,
          phone: {
            ...orderForm.phone,
            value: event.target.value,
            touched: true,
          },
        });
        break;
    }
  };

  // Handles changes to dropdown list 
  const onChangeSelectHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setOrderForm({
      ...orderForm,
      delivery: {
        ...orderForm.delivery,
        value: event.target.value,
        touched: true,
      },
    });
  };

  // Sets up an array of elements to render to screen
  const formElements = Object.entries(orderForm).map((entry) => {
    const id: string = entry[0];
    const config: IInputElement = entry[1];
    return (
      <Input
        key={id}
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        invalid={!config.valid}
        shouldValidate={config.validation ? true : false}
        touched={config.touched}
        onChangeInput={onChangeInputHandler}
        onChangeSelect={onChangeSelectHandler}
        label={id}
      ></Input>
    );
  });

  // Checks if form is valid & purchase can proceed
  const isFormValid = () => {
    let validForm = true;
    let newForm: IInputElements = orderForm;
    Object.entries(orderForm).map((entry) => {
      let isValid = true;
      const id: string = entry[0];
      const config: IInputElement = entry[1];
      isValid = checkValidity(config.value, config.validation) && isValid;
      newForm = { ...newForm, [id]: { ...config, valid: isValid } };
      validForm = isValid && validForm;
    });
    setOrderForm(newForm);
    return validForm;
  };

  // Auth context
  const { authInfo } = React.useContext(AuthContext);
  // Burger context
  const { getAmts, getPrc } = React.useContext(BurgerContext);
  
  // Handler for burger purchase
  const onSubmitHandler = () => {
    const isValid = isFormValid();
    if (isValid) {
      const CntInfo = {
        fullName: orderForm.fullName.value,
        address: orderForm.address.value,
        addressNumber: orderForm.addressNumber.value,
        postalCode: orderForm.postalCode.value,
        phone: orderForm.phone.value,
        delivery: orderForm.delivery.value,
      };
      const order = {
        ingredients: getAmts(),
        contactInfo: CntInfo,
        price: getPrc(),
        userId: authInfo.userId,
      };
      console.log(order);
      console.log(authInfo.token);
      firebase
        .post("/orders.json?auth=" + authInfo.token, order)
        .then(() => {
          alert("Order placed successfully!");
          props.history.push('/orders');
        })
        .catch(() => alert("An error has occured!"));
    }
  };

  const onCancelHandler = () => props.history.goBack();
  return (
    <MainDiv>
      {formElements}
      <Button btnClass="Yes" onClick={onSubmitHandler}>
        Submit
      </Button>
      <Button btnClass="No" onClick={onCancelHandler}>
        Cancel
      </Button>
    </MainDiv>
  );
};
export default withRouter(ContactData);
