import * as React from "react";
import IElementConfig from "../../../interfaces/IElementConfig";
import { MainDiv, InputDiv } from "./style";

interface IProps {
  invalid: boolean;
  shouldValidate: boolean;
  touched: boolean;
  elementType: string;
  elementConfig: IElementConfig;
  value: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
}

// Custom input component
const Input: React.FC<IProps> = (props) => {
  const {
    invalid,
    shouldValidate,
    touched,
    elementType,
    elementConfig,
    value,
    onChangeInput,
    onChangeSelect,
    label,
  } = props;
  let inputElement = null;
  const inputClasses = ["Input"];

  if (invalid && shouldValidate && touched) {
    inputClasses.push("Invalid");
  }
  let options;
  if (elementConfig.options) {
    options = elementConfig.options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.displayValue}
      </option>
    ));
  }

  switch (elementType) {
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          id={label}
          onChange={onChangeInput}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={value}
          id={label}
          onChange={onChangeSelect}
        >
          {options}
        </select>
      );
      break;
  }

  return (
    <MainDiv>
      <InputDiv>{inputElement}</InputDiv>
    </MainDiv>
  );
};

export default Input;
