import * as React from "react";
import IAuthContext from "../interfaces/IAuthContext";
import IAuthInfo from "../interfaces/IAuthInfo";

export const AuthContext: React.Context<IAuthContext> = React.createContext<IAuthContext>(
  {
    authInfo: { token: "", userId: "" },
    isAuth: false,
    setAuth: () => null,
    logOff: () => null,
    chkTimeout: () => null,
  }
);

const AuthContextProvider: React.FC<React.ReactNode> = (props) => {
  const { children } = props;
  const [authInfo, setAuthInfo] = React.useState({ token: "", userId: "" });
  const [isAuth, setIsAuth] = React.useState(false);

  const setAuth = (newInfo: IAuthInfo) => {
    setAuthInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
    setIsAuth(true);
  };

  const logOff = () => {
    setAuthInfo({ token: "", userId: "" });
    setIsAuth(false);
  };

  const chkTimeout = (time: number) => {
    console.log(time);
  }
  const context: IAuthContext = {
    authInfo,
    isAuth,
    setAuth,
    logOff,
    chkTimeout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default React.memo(AuthContextProvider);
