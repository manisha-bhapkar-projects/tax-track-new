import React, { useState, useEffect } from "react";
import Card from "../Card/Card";

import { bindActionCreators } from "redux";
import { callDashboardAPI } from "../../actions/UserAction";

import { connect } from "react-redux";
import Users from "../Users/Users";
import Tasks from "../Tasks/Tasks";
import { getUserDetails } from "../../utils/storage";
// import { Link } from "react-router-dom";
import constants from "../../utils/constants";

const Dashboard = (props) => {
  const [dashboardCount, setDashboard] = useState("");

  useEffect(() => {
    dashboard();
  }, []);

  const dashboard = () => {
    props
      .callDashboardAPIAction()
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          setDashboard([]);
        } else {
          setDashboard(response.data.result);
        }
      })
      .catch(() => {
        setDashboard({});
      });
  };

  return (
    <>
      <div className="row">
        <Card
          title="USERS"
          pathRoute={constants.ROUTE.SIDEBAR.USERS}
          value={dashboardCount.usersCount || "0"}
          dotClass="black-dot"
          colorName="Information of USERS"
        />

        <Card
          title="TASKS"
          pathRoute={constants.ROUTE.SIDEBAR.TASKS}
          value={dashboardCount.tasksCount || "0"}
          dotClass="black-dot"
          colorName="Information of TASKS"
        />

        {getUserDetails().role === 2 ? (
          <Card
            title="STAFF"
            pathRoute={constants.ROUTE.SIDEBAR.STAFFS}
            value={dashboardCount.staffCount || "0"}
            dotClass="black-dot"
            colorName="Information of STAFF"
          />
        ) : (
          <></>
        )}

        <Card
          title="MESSAGES"
          pathRoute={constants.ROUTE.SIDEBAR.MESSAGES}
          value={dashboardCount.messageCount || "0"}
          dotClass="black-dot"
          colorName="Information of MESSAGES"
        />

        <Card
          title="JOB UNDER REVIEW"
          pathRoute={constants.ROUTE.SIDEBAR.TASKS}
          value={dashboardCount.job_under_review || "0"}
          dotClass="job-under-review-dot"
          colorName="BLUE"
          job={4}
        />
        <Card
          title="JOB UNDER QUERY"
          pathRoute={constants.ROUTE.SIDEBAR.TASKS}
          value={dashboardCount.job_in_query || "0"}
          dotClass="job-in-query-dot"
          colorName="YELLOW"
          job={2}
        />
        <Card
          title="JOB UNDER PROCESS"
          pathRoute={constants.ROUTE.SIDEBAR.TASKS}
          value={dashboardCount.job_in_progress || "0"}
          dotClass="job-in-progress-dot"
          colorName="ORANGE"
          job={1}
        />
        <Card
          title="JOB COMPLETED"
          pathRoute={constants.ROUTE.SIDEBAR.TASKS}
          value={dashboardCount.job_complete || "0"}
          dotClass="job-complete-dot"
          colorName="GREEN"
          job={3}
        />
        <Card
          title="JOB NOT STARTED"
          pathRoute={constants.ROUTE.SIDEBAR.TASKS}
          value={dashboardCount.job_not_started || "0"}
          dotClass="job-not-started-dot"
          colorName="RED"
          job={5}
        />
      </div>

      <Tasks tableLimit={5} />
      <Users tableLimit={5} />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callDashboardAPIAction: callDashboardAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Dashboard);
