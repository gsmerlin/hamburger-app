import * as React from "react";
import MainDiv, { SecondDiv } from "./style";

interface Props {
  onClick: () => void;
}

// Simple component for creating "hamburger-menu" drawer button display
const ToggleDrawer: React.FC<Props> = (props) => {
  const { onClick } = props;
  return (
    <MainDiv onClick={onClick}>
      <SecondDiv></SecondDiv>
      <SecondDiv></SecondDiv>
      <SecondDiv></SecondDiv>
    </MainDiv>
  );
};

export default ToggleDrawer;
