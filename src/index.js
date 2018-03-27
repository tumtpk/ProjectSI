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
import Usermanagement1 from "./pages/usermanagement/usermanagement.1";
import Usermanagement2 from "./pages/usermanagement/usermanagement.2";


import Circlemanagement from "./pages/circle/circlemanagement";
import CircleCreate from "./pages/circle/create";
import CircleUpdate from "./pages/circle/update";
import CircleDetail from "./pages/circle/detail";

import Categorymanagement from "./pages/category/categorymanagement";
import CategoryCreate from "./pages/category/create";
import CategoryUpdate from "./pages/category/update";
import CategoryDetail from "./pages/category/detail";

import Evaluationmanagement from "./pages/evaluation/evaluationmanagement";
import EvaluationCreate from "./pages/evaluation/create";
import EvaluationUpdate from "./pages/evaluation/update";
import EvaluationDetail from "./pages/evaluation/detail";

import Goalmanagement from "./pages/goal/goalmanagement";
import GoalCreate from "./pages/goal/create";
import GoalUpdate from "./pages/goal/update";
import GoalDetail from "./pages/goal/detail";
import GoalCreateOtherUser from "./pages/goal/createOtherUser";
import GoalCreateOtherUserSelectUser from "./pages/goal/selectuser";
import GoalmanagementOtherUser from "./pages/goal/goalmanagementOtherUser"
import ReportAllGoal from "./pages/goal/reportallgoal";

import MainLayout from "./components/main-layout";
import Empty from "./components/layout/empty";
import NotFound from "./components/notfound";

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
          <AppRoute exact path="/usermanagement1" layout={MainLayout} component={Usermanagement1} />
          <AppRoute exact path="/usermanagement2" layout={MainLayout} component={Usermanagement2} />

          <AppRoute exact path="/circlemanagement" layout={MainLayout} component={Circlemanagement} />
          <AppRoute exact path="/circle/create" layout={MainLayout} component={CircleCreate} />
          <AppRoute exact path="/circle/update" layout={MainLayout} component={CircleUpdate} />
          <AppRoute exact path="/circle/view" layout={MainLayout} component={CircleDetail} />

          <AppRoute exact path="/categorymanagement" layout={MainLayout} component={Categorymanagement} />
          <AppRoute exact path="/category/create" layout={MainLayout} component={CategoryCreate} />
          <AppRoute exact path="/category/update" layout={MainLayout} component={CategoryUpdate} />
          <AppRoute exact path="/category/view" layout={MainLayout} component={CategoryDetail} />
          
          <AppRoute exact path="/evaluationmanagement" layout={MainLayout} component={Evaluationmanagement} />
          <AppRoute exact path="/evaluation/create" layout={MainLayout} component={EvaluationCreate} />
          <AppRoute exact path="/evaluation/update" layout={MainLayout} component={EvaluationUpdate} />
          <AppRoute exact path="/evaluation/view" layout={MainLayout} component={EvaluationDetail} />
          
          <AppRoute exact path="/goalmanagement" layout={MainLayout} component={Goalmanagement} />
          <AppRoute exact path="/goal/create" layout={MainLayout} component={GoalCreate} />
          <AppRoute exact path="/goal/update" layout={MainLayout} component={GoalUpdate} />
          <AppRoute exact path="/goal/view" layout={MainLayout} component={GoalDetail} />
          <AppRoute exact path="/goal/createotheruser" layout={MainLayout} component={GoalCreateOtherUser} />
          <AppRoute exact path="/goal/selectuser" layout={MainLayout} component={GoalCreateOtherUserSelectUser} />
          <AppRoute exact path="/goalmanagementOtherUser" layout={MainLayout} component={GoalmanagementOtherUser} />
          <AppRoute exact path="/reportallgoal" layout={MainLayout} component={ReportAllGoal} />

          <Route exact path="*" component={NotFound} status={404} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".root")
);
