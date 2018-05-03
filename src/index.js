import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";

import Login from "./pages/login";
import Content from "./pages/content";

import Usermanagement from "./pages/usermanagement/usermanagementstudent";
import UserCreateStudent from "./pages/usermanagement/createstudent";
import UserCreateTeacher from "./pages/usermanagement/createteacher";
import UserCreateAdmin from "./pages/usermanagement/createadmin";
import UserCreateHead from "./pages/usermanagement/createhead"
import UserUpdateStudent from "./pages/usermanagement/updatestudent";
import UserUpdateTeacher from "./pages/usermanagement/updateteacher";
import UserUpdateHead from "./pages/usermanagement/updatehead";
import UserUpdateAdmin from "./pages/usermanagement/updateadmin";
import UserDetailStudent from "./pages/usermanagement/detailstudent";
import UserDetailTeacher from "./pages/usermanagement/detailteacher";
import UserDetailHead from "./pages/usermanagement/detailhead";
import UserDetailAdmin from "./pages/usermanagement/detailadmin";
import Usermanagement1 from "./pages/usermanagement/usermanagementteacher";
import Usermanagement2 from "./pages/usermanagement/usermanagementhead";
import Usermanagement3 from "./pages/usermanagement/usermanagementadmin";
import importUser from "./pages/usermanagement/importUser"


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
import GoalmanagementOtherUser from "./pages/goal/goalmanagementOtherUser";
import GoalmanagementOtherUserTeacher from "./pages/goal/goalmanagementgoalCourse"
import GoalCreate from "./pages/goal/create";
import GoalUpdate from "./pages/goal/update";
import GoalDetail from "./pages/goal/detail";
import GoalCreateOtherUser from "./pages/goal/createOtherUser";
import GoalCreateOtherUserTeacher from "./pages/goal/createGoalGoalCourse";
import GoalCreateOtherUserSelectUserTeacher from "./pages/goal/selectuserteacher";
import GoalCreateOtherUserSelectUser from "./pages/goal/selectuser";


import Chart  from "./pages/goal/chart";
import chart from "./pages/goal/chart";
import GoalAchievementGraph from "./pages/goal/goalachievementgraph";
import GoalStudentsAdvisoryGraph from "./pages/goal/goalstudentsadvisorygraph";
import GoalSuccessOfTheCourse from "./pages/goal/goalsuccessofthecourse";
import ProgressMe from "./pages/goal/progressme";

import reviewmanageent from "./pages/review/reviewmanagement";

import MainLayout from "./components/main-layout";
import Empty from "./components/layout/empty";
import NotFound from "./components/notfound";
import Reviewmanagement from "./pages/review/reviewmanagement";


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

          <AppRoute exact path="/usermanagementstudent" layout={MainLayout} component={Usermanagement} />
          <AppRoute exact path="/usermanagement/createstudent" layout={MainLayout} component={UserCreateStudent} />
          <AppRoute exact path="/usermanagement/createteacher" layout={MainLayout} component={UserCreateTeacher} />
          <AppRoute exact path="/usermanagement/createhead" layout={MainLayout} component={UserCreateHead} />
          <AppRoute exact path="/usermanagement/createadmin" layout={MainLayout} component={UserCreateAdmin} />
          <AppRoute exact path="/usermanagement/updatestudent" layout={MainLayout} component={UserUpdateStudent} />
          <AppRoute exact path="/usermanagement/updateteacher" layout={MainLayout} component={UserUpdateTeacher} />
          <AppRoute exact path="/usermanagement/updatehead" layout={MainLayout} component={UserUpdateHead} />
          <AppRoute exact path="/usermanagement/updateadmin" layout={MainLayout} component={UserUpdateAdmin} />
          <AppRoute exact path="/usermanagement/viewstudent" layout={MainLayout} component={UserDetailStudent} />
          <AppRoute exact path="/usermanagement/viewteacher" layout={MainLayout} component={UserDetailTeacher} />
          <AppRoute exact path="/usermanagement/viewhead" layout={MainLayout} component={UserDetailHead} />
          <AppRoute exact path="/usermanagement/viewadmin" layout={MainLayout} component={UserDetailAdmin} />
          <AppRoute exact path="/usermanagementteacher" layout={MainLayout} component={Usermanagement1} />
          <AppRoute exact path="/usermanagementhead" layout={MainLayout} component={Usermanagement2} />
          <AppRoute exact path="/usermanagementadmin" layout={MainLayout} component={Usermanagement3} />
          <AppRoute exact path="/importUser" layout={MainLayout} component={importUser} />

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
          <AppRoute exact path="/goalmanagementOtherUser" layout={MainLayout} component={GoalmanagementOtherUser} />
          <AppRoute exact path="/goalmanagementgoalCourse" layout={MainLayout} component={GoalmanagementOtherUserTeacher} />
          <AppRoute exact path="/goal/create" layout={MainLayout} component={GoalCreate} />
          <AppRoute exact path="/goal/update" layout={MainLayout} component={GoalUpdate} />
          <AppRoute exact path="/goal/view" layout={MainLayout} component={GoalDetail} />
          <AppRoute exact path="/goal/createotheruser" layout={MainLayout} component={GoalCreateOtherUser} />
          <AppRoute exact path="/goal/creategoalcourse" layout={MainLayout} component={GoalCreateOtherUserTeacher} />
          <AppRoute exact path="/goal/selectuser" layout={MainLayout} component={GoalCreateOtherUserSelectUser} />
          <AppRoute exact path="/goal/selectuserteacher" layout={MainLayout} component={GoalCreateOtherUserSelectUserTeacher} />

          <AppRoute exact path="/chart" layout={MainLayout} component={chart} />
          <AppRoute exact path="/goal/goalchartme" layout={MainLayout} component={GoalAchievementGraph} />
          <AppRoute exact path="/goalstudentsadvisorychart" layout={MainLayout} component={GoalStudentsAdvisoryGraph} />
          <AppRoute exact path="/goalsuccessofthecourse" layout={MainLayout} component={GoalSuccessOfTheCourse} />
          <AppRoute exact path="/goal/progressme" layout={MainLayout} component={ProgressMe} />

          <AppRoute exact path="/reviewmanagement" layout={MainLayout} component={Reviewmanagement} />

          <Route exact path="*" component={NotFound} status={404} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".root")
);
