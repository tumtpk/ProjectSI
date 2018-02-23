import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";

import Login from "./pages/login";
import Content from "./pages/content";

import Usermanagement from "./pages/usermanagement/usermanagement";
import UserCreate from "./pages/usermanagement/create";
import UserUpdate from "./pages/usermanagement/update";
import UserDetail from "./pages/usermanagement/detail";

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

          <AppRoute exact path="/usermanagement" layout={MainLayout} component={Usermanagement} />
          <AppRoute exact path="/usermanagement/create" layout={MainLayout} component={UserCreate} />
          <AppRoute exact path="/usermanagement/update" layout={MainLayout} component={UserUpdate} />
          <AppRoute exact path="/usermanagement/view" layout={MainLayout} component={UserDetail} />
          
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".root")
);
