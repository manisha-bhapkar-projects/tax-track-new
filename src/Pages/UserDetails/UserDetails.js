import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
import moment from "moment";
import { JOB_STATUS } from "../../utils/switchText";

import { bindActionCreators } from "redux";
import {
  callTaskListAPI,
  callTaskListDropDownAPI,
  callTaskUpdateAPI,
  callUpdateAssignAPI,
} from "../../actions/TaskAction";
import { callStaffApi } from "../../actions/StaffAction";

import { connect } from "react-redux";
import CustomeDropDown from "../../components/CustomeDropDown/CustomeDropDown";
import { Job_status_Items } from "../../utils/staticDropdownData";
import { getUserDetails } from "../../utils/storage";
import TableHeader from "../../components/TableHeader/TableHeader";
const UserDetails = (props) => {
  const [detail, setDetails] = useState({});
  const [tableDetails, setTableDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [staffData, setStaffData] = useState([]);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const id = props.match.params.id;
    getUserDetailTableData(pageNumber, limit, search);

    fetchClient
      .get(`${constants.API.USERS.LIST}/${id}`)
      .then((res) => {
        if (res.data.status) {
          if (res.data.result && res.data.result.length) {
            setDetails(res.data.result[0]);
          }
        }
      })
      .catch((err) => {});
    getStaffData();
  }, []);

  const getUserDetailTableData = (_pageNo = 1, _limit = 10, _search = "") => {
    const id = props.match.params.id;

    fetchClient
      .get(`${constants.API.USERS.DETAILS}${id}`, {
        params: {
          page: _pageNo,
          limit: _limit,
          search: _search,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          setCount(0);
          setTableDetails([]);
        } else {
          setCount(response.data.result.count);
          setTableDetails(response.data.result.data);
        }
      })
      .catch((err) => {});
  };

  const getStaffData = () => {
    const getUserDetail = getUserDetails();
    if (getUserDetail.role === 2) {
      props
        .callStaffApiAction()
        .then((response) => {
          if (response.data.status) {
            if (response.data.result.data && response.data.result.data.length) {
              setStaffData(
                response.data.result.data.map((x) => {
                  const temp = {
                    id: x.id,
                    value: `${x.first_name} ${x.last_name}`,
                  };
                  return temp;
                })
              );
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearchClose = (e) => {
    setUserSearch(!isUserSearch);
  };
  const handlePageChange = (_page) => {
    setPageNumber(_page);
    getUserDetailTableData(_page, limit, search);
  };

  const UpdateTask = (task_id, job_status) => {
    const request = {
      task_id: `${task_id}`,
      job_status: job_status,
    };
    props.callTaskUpdateAPIAction(request).then((res) => {
      if (res.data.status) {
        let data = [...tableDetails];
        data = data.map((x) => {
          const temp = {
            ...x,
            job_status: parseInt(job_status),
          };

          return x.client_id === task_id ? temp : x;
        });
        setTableDetails(data);
      }
    });
  };

  const updateAssignTo = (task_id, staff_id) => {
    const request = {
      task_id: `${task_id}`,
      staff_id: staff_id,
    };
    props.callUpdateAssignAPIAction(request).then((res) => {
      if (res.data.status) {
        let data = [...tableDetails];
        data = data.map((x) => {
          const temp = {
            ...x,
            staff_id: parseInt(staff_id),
          };

          return x.client_id === task_id ? temp : x;
        });
        setTableDetails(data);
      }
    });
  };

  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getUserDetailTableData(1, limit, e.target.value);
  };
  const adminUsercolumns = [
    {
      name: "No.",
      selector: "client_id",
      grow: "0.1",
      cell: (row) => {
        return <div className="custome-row-style">{row.client_id}</div>;
      },
    },
    {
      name: "Client Name",
      selector: "client_name",
      grow: "4",
    },

    {
      name: "Tax Year",
      selector: "tax_year",
      grow: "4",
    },
    {
      name: "Start Date",
      selector: "start_date",
      grow: "4",
      cell: (row) => {
        return <div>{moment(row.start_date).format("DD-MM-YYYY")}</div>;
      },
    },

    {
      name: "Assign to",
      selector: "",
      grow: "5",
      cell: (row) => {
        return (
          <CustomeDropDown
            id="property"
            className="btn btn-primary btn-assign"
            filterDropdown
            data={staffData}
            value={
              row.staff_id
                ? staffData.filter((x) => x.id === row.staff_id).length
                  ? staffData.filter((x) => x.id === row.staff_id)[0].value
                  : row.staff_id
                : row.staff_id
            }
            onSelect={(key) => updateAssignTo(row.client_id, key)}
          />
        );
      },
    },

    {
      name: "Task Status",
      selector: "",
      grow: "5",
      cell: (row) => {
        return (
          <CustomeDropDown
            id="property"
            className="btn btn-primary btn-task"
            filterDropdown
            placeholder="Task Status"
            data={Job_status_Items}
            value={JOB_STATUS(row.job_status)}
            onSelect={(key) => UpdateTask(row.client_id, key)}
          />
        );
      },
    },
  ];
  const staffUsercolumns = [
    {
      name: "No.",
      selector: "client_id",
      grow: "0.1",
      cell: (row) => {
        return <div className="custome-row-style">{row.client_id}</div>;
      },
    },
    {
      name: "Client Name",
      selector: "client_name",
      grow: "4",
    },

    {
      name: "Tax Year",
      selector: "tax_year",
      grow: "4",
    },
    {
      name: "Start Date",
      selector: "start_date",
      grow: "4",
      cell: (row) => {
        return <div>{moment(row.start_date).format("DD-MM-YYYY")}</div>;
      },
    },

    {
      name: "Task Status",
      selector: "",
      grow: "5",
      cell: (row) => {
        return (
          <CustomeDropDown
            id="property"
            className="btn btn-primary"
            filterDropdown
            placeholder="Task Status"
            data={Job_status_Items}
            value={JOB_STATUS(row.job_status)}
            onSelect={(key) => UpdateTask(row.client_id, key)}
          />
        );
      },
    },
  ];
  return (
    <>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <h5 className="card-title">
            {detail.company_name} <span>({detail.id})</span>
          </h5>
          <div className="row">
            <div className="col-md-6">
              <table className="mb-0 table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <b> Client Code :</b>
                    </td>
                    <td style={{ overflow: "hidden" }}>{detail.id}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Client name :</b>
                    </td>
                    <td style={{ overflow: "hidden" }}>
                      {detail.company_name}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Company Owener :</b>
                    </td>
                    <td>
                      {detail.company_owner_fname} {detail.company_owner_lname}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <table className="mb-0 table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <b>Company Email Address : </b>{" "}
                    </td>
                    <td style={{ overflow: "hidden" }}>
                      <div style={{ overflow: "hidden", width: "150px" }}>
                        {detail.email}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <b>Company Profile : </b>{" "}
                    </td>
                    <td style={{ overflow: "hidden" }}>
                      <img
                        style={{ height: 50 }}
                        src={detail.company_logo}
                        alt="logo"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Company Number :</b>
                    </td>
                    <td style={{ overflow: "hidden" }}>
                      {detail.company_phonenumber}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="main-card mb-3 card">
        <div className="card-body">
          <TableHeader
            title="Task List"
            isOpen={isUserSearch}
            search={search}
            handelSearch={handelSerach}
            handleSearchClose={handleSearchClose}
          />

          <CardListTable
            columns={
              getUserDetails().role === 2 ? adminUsercolumns : staffUsercolumns
            }
            data={tableDetails}
            pending={false}
            pagination={false}
            custompagination
            paginationServer={false}
            noDataString={"No data found"}
            totalListCount={count}
            paginationTotalRows={count}
            paginationPerPage={10}
            onPageChangedCalled={handlePageChange}
            inputClassName="mt-3"
          />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callTaskListAPIAction: callTaskListAPI,
      callTaskListDropDownAPIAction: callTaskListDropDownAPI,
      callStaffApiAction: callStaffApi,
      callTaskUpdateAPIAction: callTaskUpdateAPI,
      callUpdateAssignAPIAction: callUpdateAssignAPI,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(UserDetails);
