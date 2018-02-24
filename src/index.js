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

import Circlemanagement from "./pages/circle/circlemanagement";
import CircleCreate from "./pages/circle/create";
import CircleUpdate from "./pages/circle/update";
import CircleDetail from "./pages/circle/detail";

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

          <AppRoute exact path="/circlemanagement" layout={MainLayout} component={Circlemanagement} />
          <AppRoute exact path="/circle/create" layout={MainLayout} component={CircleCreate} />
          <AppRoute exact path="/circle/update" layout={MainLayout} component={CircleUpdate} />
          <AppRoute exact path="/circle/view" layout={MainLayout} component={CircleDetail} />
          
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".root")
);
