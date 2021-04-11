import * as React from "react";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerDiv, { DisplayMode, LogoDiv } from "./style";

interface Props {
  open: boolean;
  onClick: () => void;
}

const SideDrawer: React.FC<Props> = (props) => {
  const { open, onClick } = props;
  const translate = open ? "0" : "-100%";
  return (
    <DisplayMode>
      <Backdrop show={open} onClick={onClick} />
      <DrawerDiv style={{ transform: `translateX(${translate})` }}>
        <LogoDiv>
          <Logo height="100%" />
        </LogoDiv>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </DrawerDiv>
    </DisplayMode>
  );
};

export default SideDrawer;
