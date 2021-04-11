import IAuthInfo from "./IAuthInfo";

interface IAuthContext {
  authInfo: IAuthInfo;
  isAuth: boolean;
  setAuth: (authInfo: IAuthInfo) => void;
  logOff: () => void;
  chkTimeout: (time: number) => void;
}

export default IAuthContext;
