import * as React from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../../context/auth-context";

// Just logs user out whenever they click the button
const Logout: React.FC = () => {
  const { logOff } = React.useContext(AuthContext);
  // If this component ever even got called, we call the authcontext to reset user authorization and then logout
  React.useEffect(() => logOff(), [logOff]);
  return <Redirect to="/" />;
};

export default Logout;
