import * as React from "react";
import Backdrop from "../Backdrop/Backdrop";
import Div from "./style";

interface Props {
  show: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = (props) => {
  const { show, onClick, children } = props;
  return (
    <>
      <Backdrop show={show} onClick={onClick}></Backdrop>
      <Div
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </Div>
    </>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
