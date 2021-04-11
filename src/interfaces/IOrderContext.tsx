import IAmounts from "./IAmounts";
import IContactInfo from "./IContactInfo";
import IOrder from "./IOrder";

interface IOrderContext {
  order: IOrder;
  updCntInfo: (info: IContactInfo) => void;
  updIngs: (ingredients: IAmounts) => void;
}

export default IOrderContext;
