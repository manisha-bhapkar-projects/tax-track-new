import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import { useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import { bindActionCreators } from "redux";
import { callUserListAPi } from "../../actions/UserAction";
import { connect } from "react-redux";
import Placeholder from "../../assets/images/placeholder.jpg";
import TableHeader from "../../components/TableHeader/TableHeader";
const Users = (props) => {
  const [usersData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUserList(pageNumber, props.tableLimit || limit, search);
  }, []);

  const getUserList = (_pageNo = 1, _limit = 10, _search = "") => {
    setloading(true);
    props
      .callUserListAPiAction(_pageNo, _limit, _search)
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

  const handleUserSearch = (e) => {
    setUserSearch(!isUserSearch);
  };
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getUserList(1, props.tableLimit || limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getUserList(perPage, props.tableLimit || limit, search);
  };

  const Usercolumns = [
    {
      name: "No.",
      selector: "id",
      grow: "0.1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
      },
    },
    {
      name: "Company Name",
      selector: "company_name",
      grow: "2",
      cell: (row) => {
        return (
          <div className="d-flex" style={{ overflow: "hidden" }}>
            <img
              className="table-show-image-logo align-self-center"
              src={row.company_logo || Placeholder}
              alt="user"
            />
            <p className="m-auto">{row.company_name}</p>
          </div>
        );
      },
    },

    {
      name: "Company Owner",
      selector: "company_owner_fname",
      grow: "2",
    },
    {
      name: "Company Email",
      selector: "email",
      grow: "2",
    },
    {
      name: " Company Number",
      selector: "company_phonenumber",
      grow: "3",
    },

    {
      name: "",
      selector: "",
      right: true,
      grow: "2",
      cell: (row) => {
        return (
          <button
            onClick={() => {
              history.push(`${constants.ROUTE.USER.VIEW}${row.id}`);
            }}
            className="view-task"
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
          title="Users List"
          isOpen={isUserSearch}
          search={search}
          handelSearch={handelSerach}
          handleSearchClose={handleUserSearch}
        />
        <CardListTable
          columns={Usercolumns}
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
        />
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callUserListAPiAction: callUserListAPi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Users);
