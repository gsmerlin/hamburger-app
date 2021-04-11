import * as React from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../../context/auth-context";

const Logout: React.FC = () => {
  const { logOff } = React.useContext(AuthContext);
  React.useEffect(() => logOff(), [logOff]);
  return <Redirect to="/" />;
};

export default Logout;
