import * as React from "react";
import IAmounts from "../interfaces/IAmounts";
import IContactInfo from "../interfaces/IContactInfo";
import IOrderContext from "../interfaces/IOrderContext";

export const OrderContext: React.Context<IOrderContext> = React.createContext<IOrderContext>(
  {
    order: {
      ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
      contactInfo: {
        fullName: "",
        address: "",
        addressNumber: "",
        phone: "",
        postalCode: "",
        delivery: "",
      },
    },
    updCntInfo: () => null,
    updIngs: () => null,
  }
);

const OrderContextProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;
  const [ingredients, setIngredients] = React.useState<IAmounts>({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });

  const [contactInfo, setContactInfo] = React.useState<IContactInfo>({
    fullName: "",
    address: "",
    addressNumber: "",
    phone: "",
    postalCode: "",
    delivery: "",
  });

  const updCntInfo = (info: IContactInfo) => {
    setContactInfo((prevInfo) => ({ ...prevInfo, info }));
  };

  const updIngs = (newIngs: IAmounts) => {
    setIngredients(newIngs);
  };

  const context: IOrderContext = {
    order: {
      ingredients,
      contactInfo,
    },
    updCntInfo,
    updIngs,
  };

  return (
    <OrderContext.Provider value={context}>{children}</OrderContext.Provider>
  );
};

export default React.memo(OrderContextProvider);
