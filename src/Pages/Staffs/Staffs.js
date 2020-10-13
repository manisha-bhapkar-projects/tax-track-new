import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";
import { callStaffListApi } from "../../actions/StaffAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TableHeader from "../../components/TableHeader/TableHeader";

const Staffs = (props) => {
  const [usersData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [isStaffSearch, setStaffSearch] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getStaffList(pageNumber, limit, search);
  }, []);

  const getStaffList = (_pageNo = 1, _limit = 10, _search = "") => {
    setloading(true);

    props
      .callStaffListApiAction(_pageNo, _limit, _search)
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
      .catch(() => {});
  };

  const handleStaffSearch = (e) => {
    setStaffSearch(!isStaffSearch);
  };
  const handelSerach = (e) => {
    setSearch(e.target.value);
    setPageNumber(1);
    getStaffList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage) => {
    setPageNumber(perPage);
    getStaffList(perPage, limit, search);
  };

  const Staffcolumns = [
    {
      name: "No.",
      selector: "id",
      grow: "0.1",
      cell: (row) => {
        return <div className="custome-row-style">{row.id}</div>;
      },
    },
    {
      name: "First Name",
      selector: "first_name",
      grow: "3",
    },

    {
      name: "Last Name",
      selector: "last_name",
      grow: "3",
    },
    {
      name: "Phone Number",
      selector: "phoneno",
      grow: "3",
    },
    {
      name: "Email Address",
      selector: "email",
      grow: "3",
    },
  ];
  return (
    <div className="main-card mb-3 card">
      <div className="card-body">
        <TableHeader
          title="Staff List"
          isOpen={isStaffSearch}
          search={search}
          handelSearch={handelSerach}
          handleSearchClose={handleStaffSearch}
        />

        <CardListTable
          columns={Staffcolumns}
          data={usersData}
          pending={loading}
          pagination={false}
          custompagination
          paginationServer={false}
          noDataString={"No data found"}
          totalListCount={count}
          paginationTotalRows={count}
          paginationPerPage={limit}
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
      callStaffListApiAction: callStaffListApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Staffs);
