import React from "react";
import PropTypes from "prop-types";
// import Moment from "moment";

const ViewRevisionLogs = ({ revisionLogs }) => {
  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade  show active"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        <div className="container mt-3 revision-logs">
          <div className="row revision-details">
            {revisionLogs && revisionLogs.length ? (
              revisionLogs.map((date,Index) => {
                return (
                  <div className="col-md-4" key={Index}>
                    <h3>Date :{date.date}</h3>
                    {date.logs && date.logs.length ? (
                      date.logs.map((log, index) => {
                        return <p key={index}>{log.task_data_type_display_name_2}</p>;
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ViewRevisionLogs.defaultProps = {};

ViewRevisionLogs.propTypes = {
  revisionLogs: PropTypes.instanceOf(Array),
};
export default ViewRevisionLogs;
