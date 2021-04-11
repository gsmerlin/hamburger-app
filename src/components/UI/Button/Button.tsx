import * as React from "react";
import StyledButton from "./style";

interface Props {
  disabled?: boolean;
  btnClass: string;
  onClick: () => void;
  children: string;
}

const Button: React.FC<Props> = (props) => {
  const { disabled, btnClass, onClick, children } = props;
  return (
    <StyledButton disabled={disabled} onClick={onClick} className={btnClass}>
      {children}
    </StyledButton>
  );
};

export default Button;
