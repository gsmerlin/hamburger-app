import React from "react";
import { Route, Switch } from "react-router";
import Auth from "./components/Auth/Auth";
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Checkout from "./components/Checkout/Checkout";
import Layout from "./components/Layout/Layout";
import Orders from "./components/Orders/Orders";
import AuthContextProvider from "./context/auth-context";
import BurgerContextProvider from "./context/burger-context";

const App: React.FC = () => {
  return (
    <>
      <AuthContextProvider>
        <BurgerContextProvider>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout/" component={Checkout} />
              <Route path="/auth" component={Auth} />
              <Route path="/orders" component={Orders} />
            </Switch>
          </Layout>
        </BurgerContextProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
