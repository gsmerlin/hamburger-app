import * as React from "react";
import { AuthContext } from "../../../context/auth-context";
import NavigationItem from "./NavigationItem/NavigationItem";
import NavItems from "./style";

// Main component for handling all navlinks
const NavigationItems: React.FC = () => {
  const { isAuth } = React.useContext(AuthContext);
  return (
    <NavItems>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {isAuth ? (
        <>
          <NavigationItem link="/orders" exact={false}>
            Orders
          </NavigationItem>
          <NavigationItem link="/logout" exact={false}>
            Sign Out
          </NavigationItem>
        </>
      ) : (
        <NavigationItem link="/auth" exact={false}>
          Sign In
        </NavigationItem>
      )}
    </NavItems>
  );
};

export default NavigationItems;
