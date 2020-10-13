import React, { useState, useEffect } from "react";
import ViewChats from "./ViewChats";
import ViewFile from "./ViewFile";
import ViewRevisionLog from "./ViewRevisionLog";
import Modal from "../../components/Modal/Modal";
import { bindActionCreators } from "redux";
import { calLTaskDetailAPI } from "../../actions/TaskAction";
import { connect } from "react-redux";
import Moment from "moment";
import { MARITAL_STATUS, JOB_STATUS } from "../../utils/switchText";
// import constants from "../../utils/constants";
// import { useHistory } from "react-router";
const CilentIncomeDetail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isId, setId] = useState(1);
  // const [details, setDetails] = useState("");
  const [clientId, setClientId] = useState("");
  const [client, setClient] = useState({});
  // const history = useHistory();
  useEffect(() => {
    getClientData();
  }, []);

  const getClientData = () => {
    props
      .calLTaskDetailAPIAction(props.match.params.id)
      .then((response) => {
        if (response.data.status) {
          if (response.data.result && response.data.result.length) {
            setClient(response.data.result[0]);
          }
        }
      })
      .catch(() => {});
  };

  const handleCloseModal = () => {
    getClientData();
    setShowModal(false);
  };
  const handleJobCompleteClick = (e) => {
    setClientId(props.match.params.id);
    setShowModal(true);
  };

  const handleClick = (id) => {
    setId(id);
  };

  return (
    <>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-md-12 pb-3">
              <div className="row align-items-center ml-0 mr-0 justify-content-between">
                <h5 className="card-title mb-0">
                  {client.task_name} <span>({client.task_code})</span>
                </h5>
                {/* <button
                  className="btn-primary"
                  onClick={() =>
                    history.push(
                      `${constants.ROUTE.TASKS.EDIT_VIEW_BY_ID}${props.match.params.id}`
                    )
                  }
                >
                  <span>Edit</span>
                </button> */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <table className="mb-0 table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <b> Employee Code :</b>
                    </td>
                    <td>{client.task_code}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Employee name :</b>
                    </td>
                    <td>{client.task_name} </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Phone Number :</b>
                    </td>
                    <td>{client.phone_number}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Address :</b>
                    </td>
                    <td>{client.address}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Date of Birth :</b>
                    </td>
                    <td>
                      {client.dob
                        ? Moment(client.dob).format("DD-MM-YYYY")
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Marital Satus :</b>
                    </td>
                    <td>{MARITAL_STATUS(client.marital_status)}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Job Status :</b>
                    </td>
                    <td> {JOB_STATUS(client.job_status)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="mb-0 table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <b>Tax Year : </b>
                    </td>
                    <td>{client.tax_year}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Submission Date : </b>
                    </td>
                    <td>
                      {" "}
                      {client.created_at
                        ? Moment(client.created_at).format("DD-MM-YYYY")
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Acceptance Date :</b>
                    </td>
                    <td>
                      {client.created_at
                        ? Moment(client.created_at).format("DD-MM-YYYY")
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Post Code :</b>
                    </td>
                    <td>{client.post_code}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>National Insurance Number :</b>
                    </td>
                    <td>{client.insurance_no}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>UTR (Unique Tax Reference) :</b>
                    </td>
                    <td>{client.utr_no}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Tax Office Address :</b>
                    </td>
                    <td>{client.tax_office_address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3 card">
        <div className="card-header-tab card-header d-flex justify-content-between">
          <div className="btn-actions-pane">
            <div className="nav">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <div
                    className={`nav-link  ${isId === 1 ? "active" : ""}`}
                    onClick={() => handleClick(1)}
                    id="home-tab"
                    data-toggle="tab"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    Files
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${isId === 2 ? "active" : ""}`}
                    id="profile-tab"
                    data-toggle="tab"
                    onClick={() => handleClick(2)}
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    Document Logs
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={`nav-link ${isId === 3 ? "active" : ""}`}
                    id="contact-tab"
                    data-toggle="tab"
                    onClick={() => handleClick(3)}
                    role="tab"
                    aria-controls="contact"
                    aria-selected="false"
                  >
                    Chat
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="pr-2">
            <button
              className="btn-primary"
              onClick={handleJobCompleteClick}
              type="button"
              id="send_msg"
            >
              Job complete
            </button>
          </div>
        </div>
        {isId === 1 ? (
          <ViewFile
            incomeData={client.income_data}
            completionData={client.completion_data}
          />
        ) : isId === 2 ? (
          <ViewRevisionLog revisionLogs={client.revision_logs} />
        ) : (
          <ViewChats clientId={props.match.params.id} />
        )}
      </div>
      <Modal
        isOpen={showModal}
        onCancelClickListner={handleCloseModal}
        clientId={clientId}
      />
    </>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      calLTaskDetailAPIAction: calLTaskDetailAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(CilentIncomeDetail);
