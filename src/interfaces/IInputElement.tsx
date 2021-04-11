import IElementConfig from "./IElementConfig";
import IElementValidation from "./IElementValidation";

interface IInputElement {
    elementType: string;
    elementConfig: IElementConfig;
    value: string;
    validation: IElementValidation;
    valid: boolean;
    touched: boolean;
  }

  export default IInputElement;