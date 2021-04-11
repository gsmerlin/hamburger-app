import axios from "axios";
import * as React from "react";
import { Redirect, RouterProps, withRouter } from "react-router";
import { AuthContext } from "../../context/auth-context";
import IAuthFields from "../../interfaces/IAuthFields";
import IElementValidation from "../../interfaces/IElementValidation";
import IInputElement from "../../interfaces/IInputElement";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import MainDiv from "./style";

const Auth: React.FC<RouterProps> = (props) => {
  const [authForm, setAuthForm] = React.useState<IAuthFields>({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [mode, setMode] = React.useState("signin");
  const { setAuth, isAuth, chkTimeout } = React.useContext(AuthContext);

  const switchMode = () => {
    if (mode === "signin") {
      setMode("signup");
    } else {
      setMode("signin");
    }
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.id) {
      default:
        return;
      case "email":
        setAuthForm({
          ...authForm,
          email: {
            ...authForm.email,
            value: event.target.value,
            touched: true,
          },
        });
        break;
      case "password":
        setAuthForm({
          ...authForm,
          password: {
            ...authForm.password,
            value: event.target.value,
            touched: true,
          },
        });
        break;
    }
  };

  const formElements = Object.entries(authForm).map((entry) => {
    const id: string = entry[0];
    const config: IInputElement = entry[1];
    return (
      <Input
        key={id}
        elementType={config.elementType}
        elementConfig={config.elementConfig}
        value={config.value}
        invalid={!config.valid}
        shouldValidate={config.validation ? true : false}
        touched={config.touched}
        onChangeInput={onChangeInputHandler}
        onChangeSelect={() => null}
        label={id}
      ></Input>
    );
  });

  const redirect = isAuth ? <Redirect to="/" /> : null;

  const checkValidity = (value: string, rules: IElementValidation) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  const isFormValid = () => {
    let validForm = true;
    let newForm: IAuthFields = authForm;
    Object.entries(authForm).map((entry) => {
      let isValid = true;
      const id: string = entry[0];
      const config: IInputElement = entry[1];
      isValid = checkValidity(config.value, config.validation) && isValid;
      newForm = { ...newForm, [id]: { ...config, valid: isValid } };
      validForm = isValid && validForm;
    });
    return validForm;
  };
  const onSubmitHandler = () => {
    const isValid = isFormValid();
    if (isValid) {
      const url =
        mode === "signup"
          ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDko5xnM5c-TdFT-6eXCT07kolI9qsjKos"
          : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDko5xnM5c-TdFT-6eXCT07kolI9qsjKos";
      const authData = {
        email: authForm.email.value,
        password: authForm.password.value,
        returnSecureToken: true,
      };
      axios
        .post(url, authData)
        .then((response) => {
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate.toDateString());
          localStorage.setItem("userId", response.data.localId);
          chkTimeout(expirationDate.getTime());
          setAuth({
            token: response.data.idToken,
            userId: response.data.localId,
          });
        })
        .catch(() => console.log("An error has occurred!"));
      console.log(isAuth);
    }
  };

  const switchButton =
    mode === "signin" ? "Switch to Sign Up" : "Switch to Sign In";

  const onCancelHandler = () => props.history.goBack();

  return (
    <MainDiv>
      {redirect}
      <div>
        {formElements}
        <Button onClick={onSubmitHandler} btnClass="Yes">
          Submit
        </Button>
        <Button onClick={onCancelHandler} btnClass="No">
          Cancel
        </Button>
      </div>
      <Button onClick={switchMode} btnClass="No">
        {switchButton}
      </Button>
    </MainDiv>
  );
};

export default withRouter(Auth);
