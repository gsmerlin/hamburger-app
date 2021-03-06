import * as React from "react";
import burgerLogo from "./assets/burger-logo.png";
import MainDiv, { LogoImg } from "./style";

interface Props {
  height: string;
}

// Simple component to display the mock up logotype
const Logo: React.FC<Props> = (props) => {
  const { height } = props;
  return (
    <MainDiv style={{ height }}>
      <LogoImg src={burgerLogo} alt="iBurger" />
    </MainDiv>
  );
};

export default Logo;
