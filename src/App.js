import React, { useState } from "react";

import "./assets/css/main.css";
import "./assets/css/messages.css";
import "./assets/css/style.css";
import "./assets/css/modal.css";
import "react-notifications/lib/notifications.css";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./utils/routes/PublicRoute/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute/PrivateRoute";
import LayoutwithSidebar from "./components/Layout/LayoutWithSidebar";
import Login from "./Pages/Login/Login";
import { adminSideBarRoutes, staffSideBarRoutes } from "./utils/routes";

import { NotificationContainer } from "react-notifications";
import { getUserDetails } from "./utils/storage";
import constants from "./utils/constants";

function App() {
  const [isSidebar, setIsSidebar] = useState(false);

  const handleCollapse = (status) => {
    setIsSidebar(!status);
  };

  return (
    <>
      <div
        className={`app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header ${
          isSidebar ? "closed-sidebar" : ""
        }`}
      >
        <NotificationContainer />
        <Router basename="/taxtrak-admin">
          <Switch>
            <PublicRoute
              exact
              path={constants.ROUTE.LOGIN.LOGIN}
              component={Login}
            />
            <Switch>
              <LayoutwithSidebar parentCallback={handleCollapse}>
                <Switch>
                  {getUserDetails().role === 3
                    ? staffSideBarRoutes.map((item, index) => {
                        return (
                          <PrivateRoute
                            path={item.path}
                            exact
                            component={item.component}
                            key={index}
                          />
                        );
                      })
                    : adminSideBarRoutes.map((item, index) => {
                        return (
                          <PrivateRoute
                            path={item.path}
                            exact
                            component={item.component}
                            key={index}
                          />
                        );
                      })}
                  <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
                </Switch>
              </LayoutwithSidebar>
              <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
            </Switch>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
