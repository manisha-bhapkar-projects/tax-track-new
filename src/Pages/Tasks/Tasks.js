import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  callTaskListAPI,
  callTaskListDropDownAPI,
  callTaskUpdateAPI,
  callUpdateAssignAPI,
} from "../../actions/TaskAction";
import { connect } from "react-redux";
import CustomeDropDown from "../../components/CustomeDropDown/CustomeDropDown";
import { callStaffApi } from "../../actions/StaffAction";
import { Job_status_Items } from "../../utils/staticDropdownData";
import { JOB_STATUS } from "../../utils/switchText";
import { getUserDetails } from "../../utils/storage";
import moment from "moment";
import TableHeader from "../../components/TableHeader/TableHeader";
const Tasks = (props) => {
  const [usersData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [staffData, setStaffData] = useState([]);
  // const [filterProps, setFilterProps] = useState("");
  // const [filterValue, setFilterValue] = useState([]);

  const history = useHistory();

  useEffect(() => {
    // if (props.history) {
    //   setFilterProps(props.history.location.jobStatus);
    // }
    TaskList(
      pageNumber,
      props.tableLimit || limit,
      search,
      props.history ? props.history.location.jobStatus : "1,2,3,4,5"
    );
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
  }, []);

  const UpdateTask = (task_id, job_status) => {
    const request = {
      task_id: `${task_id}`,
      job_status: job_status,
    };
    props.callTaskUpdateAPIAction(request).then((res) => {
      if (res.data.status) {
        let data = [...usersData];
        data = data.map((x) => {
          const temp = {
            ...x,
            job_status: parseInt(job_status),
          };

          return x.client_id === task_id ? temp : x;
        });
        setUserData(data);
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
        let data = [...usersData];
        data = data.map((x) => {
          const temp = {
            ...x,
            staff_id: parseInt(staff_id),
          };

          return x.client_id === task_id ? temp : x;
        });
        setUserData(data);
      }
    });
  };

  const TaskList = (
    _pageNo = 1,
    _limit = 10,
    _search = "",
    _filter = "1,2,3,4,5"
  ) => {
    setloading(true);
    props
      .callTaskListAPIAction(_pageNo, _limit, _search, _filter)
      .then((response) => {
        if (Array.isArray(response.data.result)) {
          setCount(0);
          setUserData([]);
        } else {
          setCount(response.data.result.count);
          setUserData(response.data.result.data);
        }
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTaskSearch = (e) => {
    setIsSearch(!isSearch);
  };

  const handelSearch = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    TaskList(1, props.tableLimit || limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    TaskList(perPage, props.tableLimit || limit, search);
  };

  const handleSelectFilter = (_id) => {
    // setFilterValue(_id);
    setSearch("");
    setPageNumber(1);
    if (_id.includes("all") || _id.length === 0) {
      TaskList(1, props.tableLimit || limit, "", "1,2,3,4,5");
    } else {
      TaskList(1, props.tableLimit || limit, "", _id.join());
    }
    // console.log(_id);
  };
  const adminTaskcolumns = [
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
      grow: "3",
    },

    {
      name: "Tax Year",
      selector: "tax_year",
      grow: "2",
    },
    {
      name: "Start Date",
      selector: "phone_number",
      grow: "2.5",
      cell: (row) => {
        return (
          <div>
            {row.start_date
              ? moment(row.start_date).format("DD-MM-YYYY")
              : row.start_date}
          </div>
        );
      },
    },

    {
      name: "Assign to",
      selector: "",
      grow: "4",
      cell: (row) => {
        return (
          <CustomeDropDown
            id="property"
            className="btn btn-primary btn-assign"
            filterDropdown
            data={staffData}
            drop="left"
            value={
              row.staff_id
                ? staffData.filter((x) => x.id === row.staff_id).length
                  ? staffData.filter((x) => x.id === row.staff_id)[0].value
                  : `${row.staff_id}`
                : `${row.staff_id}`
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
            drop="left"
            placeholder="Task Status"
            data={Job_status_Items}
            value={JOB_STATUS(row.job_status)}
            onSelect={(key) => UpdateTask(row.client_id, key)}
          />
        );
      },
    },
    {
      name: "",
      selector: "",
      grow: "3",
      cell: (row) => {
        return (
          <button
            onClick={() => {
              history.push(constants.ROUTE.TASKS.VIEW_BY_ID + row.client_id);
            }}
            className="view-page-details"
          >
            <span> View </span>
          </button>
        );
      },
    },
  ];
  const staffTaskcolumns = [
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
      grow: "3",
    },

    {
      name: "Tax Year",
      selector: "tax_year",
      grow: "2",
    },
    {
      name: "Start Date",
      selector: "phone_number",
      grow: "2.5",
      cell: (row) => {
        return (
          <div>
            {row.start_date
              ? moment(row.start_date).format("DD-MM-YYYY")
              : row.start_date}
          </div>
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
    {
      name: "",
      selector: "",
      grow: "3",
      cell: (row) => {
        return (
          <button
            onClick={() => {
              history.push(constants.ROUTE.TASKS.VIEW_BY_ID + row.client_id);
            }}
            className="view-page-details"
          >
            <span> View </span>
          </button>
        );
      },
    },
  ];
  return (
    <div className="main-card mb-3 card">
      <div className="card-body">
        <TableHeader
          title="Task List"
          isOpen={isSearch}
          search={search}
          handelSearch={handelSearch}
          handleSearchClose={handleTaskSearch}
          isFilter
          filterValue={props.history ? props.history.location.jobStatus : ""}
          handleSelectFilter={handleSelectFilter}
        />

        <CardListTable
          columns={
            getUserDetails().role === 2 ? adminTaskcolumns : staffTaskcolumns
          }
          data={usersData}
          pending={loading}
          pagination={false}
          custompagination
          paginationServer={false}
          noDataString={"No data found"}
          totalListCount={count}
          paginationTotalRows={count}
          paginationPerPage={props.tableLimit || limit}
          onPageChangedCalled={handlePageChange}
          inputClassName="mt-3"
          // sortFunction={customSort}
        />
      </div>
    </div>
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

export default connect(null, mapDispatchToProps)(Tasks);
