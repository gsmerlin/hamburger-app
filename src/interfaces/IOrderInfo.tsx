import IAmounts from "./IAmounts";
import IContactInfo from "./IContactInfo";

interface IOrderInfo {
    ingredients: IAmounts;
    contactInfo: IContactInfo
}

export default IOrderInfo;