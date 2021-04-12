import * as React from "react";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Content from "./style";

// Main layout container handling toolbar/side-drawer/menu navigation
const Layout: React.FC<React.ReactNode> = (props) => {
  const { children } = props;

  const [showDrawer, toggleShowDrawer] = React.useState(false);

  const closeDrawerHandler = () => toggleShowDrawer(false);

  const toggleDrawer = () => toggleShowDrawer((oldDrawer) => !oldDrawer);

  return (
    <>
      <Toolbar onClick={toggleDrawer}></Toolbar>
      <SideDrawer open={showDrawer} onClick={closeDrawerHandler}></SideDrawer>
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
