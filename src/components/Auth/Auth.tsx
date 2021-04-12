import axios from "axios";
import * as React from "react";
import { Redirect, RouterProps, withRouter } from "react-router";
import { AuthContext } from "../../context/auth-context";
import IAuthFields from "../../interfaces/IAuthFields";
import IInputElement from "../../interfaces/IInputElement";
import checkValidity from "../../utils/checkvalidity";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import MainDiv from "./style";


// Authenticates user
const Auth: React.FC<RouterProps> = (props: RouterProps) => {
  // Authentication form field configuration
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

  // Toggles between sign in & sign up modes
  const [mode, setMode] = React.useState("signin");

  // Auth context usage
  const { setAuth, isAuth, chkTimeout } = React.useContext(AuthContext);

  // Switches between sign in & sign up
  const switchMode = () => {
    if (mode === "signin") {
      setMode("signup");
    } else {
      setMode("signin");
    }
  };

  // Handles changes for when e-mail || password are inputted
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

  // Prepares input elements for rendering on screen
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

  // If the user is logged in they shouldn't be seeing this page; This variable lets us automatically redirect them back to the homepage.
  const redirect = isAuth ? <Redirect to="/" /> : null;

  // Loops at all form elements to determine whether or not they are valid
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

  // Handles authentication to firebase
  const onSubmitHandler = () => {
    const isValid = isFormValid();
    if (isValid) {
      // Assigns sign up || sign in url depending on option
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
          // Calculates when token expires
          const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
          );
            
          // Saves token info to local storage
          localStorage.setItem("token", response.data.idToken);
          localStorage.setItem("expirationDate", expirationDate.toDateString());
          localStorage.setItem("userId", response.data.localId);
            
          // To-Do: Figure out why expiration isn't working as it should
          chkTimeout(expirationDate.getTime());
          setAuth({
            token: response.data.idToken,
            userId: response.data.localId,
          });
        })
        // To-Do: Implement proper error handling. Maybe a modal?
        .catch(() => console.log("An error has occurred!"));
    }
  };

  const switchButton =
    mode === "signin" ? "Switch to Sign Up" : "Switch to Sign In";

  // Simple button to send user back if they cancel
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
