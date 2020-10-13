import React from "react";
import zip_blue from "../../assets/images/zip-blue.png";
import zip_yellow from "../../assets/images/zip-yellow.png";
import PropTypes from "prop-types";

const ViewFile = ({ completionData, incomeData }) => {
  return (
    <div className="tab-content" id="myTabContent">
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div className="container mt-3 file-details">
          <div className="row">
            {incomeData && incomeData.length ? (
              <>
              <div className="w-100">
                <h5
                  className="card-title text-left"
                  style={{ padding: "0 15px 15px" }}
                >
                  DOCUMENT FROM CUSTOMER
                </h5>
              </div>
             { incomeData.map((zip) => {
                return (
                  <div className="col-md-2" key={zip.tasks_data_id}>
                    <a href={zip.filename} download>
                      <img src={zip_blue} alt="zip" className="zip-img" />
                      <p>{zip.task_data_type_display_name_2}</p>
                    </a>
                  </div>
                );
              })}
              </>
            ) : (
              <></>
            )}

            {completionData && completionData.length ? (
              <>
                <div className="separator-custom" />
                <div className="w-100">
                  <h5
                    className="card-title text-left"
                    style={{ padding: "0 15px 15px" }}
                  >
                    DOCUMENT FROM INITOR GLOBAL
                  </h5>
                </div>
                {completionData.map((zip) => {
                  return (
                    <div
                      className="col-md-2 file-completed"
                      key={zip.tasks_data_id}
                    >
                      <a href={zip.filename} download>
                        <img src={zip_yellow} alt="zip" className="zip-img" />
                        <p>{zip.task_data_type_display_name_2}</p>
                      </a>
                    </div>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ViewFile.defaultProps = {};

ViewFile.propTypes = {
  completionData: PropTypes.instanceOf(Array),
  incomeData: PropTypes.instanceOf(Array),
};

export default ViewFile;
