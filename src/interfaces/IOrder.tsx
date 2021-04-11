import IAmounts from "./IAmounts";
import IContactInfo from "./IContactInfo";

interface IOrder {
  ingredients: IAmounts;
  contactInfo: IContactInfo;
}

export default IOrder;
