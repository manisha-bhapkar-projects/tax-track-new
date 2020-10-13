import React, { useState, useEffect } from "react";
import CardListTable from "../../components/CardListTable/CardListTable";

import { bindActionCreators } from "redux";
import { callContactUsListAPiAction } from "../../actions/UserAction";
import { connect } from "react-redux";
import TableHeader from "../../components/TableHeader/TableHeader";
import { Modal, Button } from "react-bootstrap";

function ContactUS(props) {
  const [usersData, setUserData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setloading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [isUserSearch, setUserSearch] = useState(false);
  const [isContaint, setIsContaint] = useState(false);
  const [containt, setContaint] = useState({});

  useEffect(() => {
    getUserList(pageNumber, limit, search);
  }, []);

  const getUserList = (_pageNo = 1, _limit = 10, _search = "") => {
    setloading(true);
    props
      .callContactUsListAPi(_pageNo, _limit, _search)
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
    getUserList(1, limit, e.target.value);
  };

  const handlePageChange = (perPage, page) => {
    setPageNumber(perPage);
    getUserList(perPage, limit, search);
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
      grow: "1",
    },

    {
      name: "Company Owner",
      selector: "fname",
      grow: "1",
      cell: (row) => {
        return (
          <div className="custome-row-style">
            {row.fname} {row.lname}
          </div>
        );
      },
    },
    {
      name: "Title",
      selector: "title",
      grow: "1",
      cell: (row) => {
        return (
          <div
            style={{
              overflow: "hidden",
              // textOverflow: "ellipsis",
              cursor: "pointer",
              maxHeight: "45px",
              display: "-webkit-box",
              webkitLineClamp: "3",
              webkitBoxOrient: "vertical",
            }}
            onClick={() => {
              setContaint(row);
              setIsContaint(true);
            }}
          >
            {row.title}
          </div>
        );
      },
    },
    {
      name: "Message",
      selector: "body",
      grow: "2",
      cell: (row) => {
        return (
          <div
            style={{
              overflow: "hidden",
              // textOverflow: "ellipsis",
              cursor: "pointer",
              maxHeight: "45px",
              display: "-webkit-box",
              webkitLineClamp: "3",
              webkitBoxOrient: "vertical",
            }}
            onClick={() => {
              setContaint(row);
              setIsContaint(true);
            }}
          >
            {row.body}
          </div>
        );
      },
    },
  ];
  return (
    <div className="main-card mb-3 card">
      <div className="card-body">
        <TableHeader
          title="Contact List"
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
          paginationPerPage={limit}
          onPageChangedCalled={handlePageChange}
          inputClassName="mt-3"
        />
      </div>
      <Modal show={isContaint} onHide={() => setIsContaint(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{containt.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{containt.body}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary ml-2" onClick={() => setIsContaint(false)}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callContactUsListAPi: callContactUsListAPiAction,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(ContactUS);
