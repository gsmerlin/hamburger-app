import * as React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import { DisplayMode } from "../SideDrawer/style";
import ToggleDrawer from "../SideDrawer/ToggleDrawer/ToggleDrawer";
import Header, { LogoDiv, Nav } from "./style";

interface Props {
  onClick: () => void;
}

const Toolbar: React.FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <Header>
      <DisplayMode>
        <ToggleDrawer onClick={onClick} />
      </DisplayMode>
      <LogoDiv>
        <Logo height="100%" />
      </LogoDiv>
      <Nav>
        <NavigationItems />
      </Nav>
    </Header>
  );
};

export default Toolbar;
