import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";

import Login from "./pages/login";
import Content from "./pages/content";

import MainLayout from "./components/main-layout";
import Empty from "./components/layout/empty";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <AppRoute exact path="/" layout={Empty} component={Login} />
          <AppRoute exact path="/dashboard" layout={MainLayout} component={Content} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".root")
);
