import * as React from "react";
import Div from "./style";

interface Props {
  show: boolean;
  onClick: () => void;
}

// Simple component for grayed out backdrop
const Backdrop: React.FC<Props> = (props) => {
  const { show, onClick } = props;
  return show ? <Div onClick={onClick}></Div> : null;
};

export default Backdrop;
