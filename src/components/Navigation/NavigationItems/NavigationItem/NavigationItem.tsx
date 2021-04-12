import * as React from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./style";

interface Props {
  link: string;
  exact: boolean;
  children: React.ReactNode;
}

// Single instance of navigation item
const NavigationItem: React.FC<Props> = (props) => {
  const { link, exact, children } = props;
  return (
    <NavItem>
      <NavLink to={link} exact={exact}>
        {children}
      </NavLink>
    </NavItem>
  );
};

export default NavigationItem;
