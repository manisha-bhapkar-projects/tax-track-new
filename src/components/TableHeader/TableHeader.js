import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { Job_status_Items } from "../../utils/staticDropdownData";
// import CustomeDropDown from "../CustomeDropDown/CustomeDropDown";
import { propTypes } from "react-bootstrap/esm/Image";
import "./TableHeader.css";
function TableHeader({
  title,
  isOpen,
  search,
  handelSearch,
  handleSearchClose,
  isFilter,
  filterValue,
  handleSelectFilter,
}) {
  const [filter, setFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    setFilterData([parseInt(filterValue)]);
  }, []);
  const handleSelectFilters = (id) => {
    let demoArray = [...filterData];
    if (demoArray.includes(id) && id === "all") {
      demoArray = [];
    } else if (demoArray.includes(id)) {
      const index = demoArray.findIndex((x) => x === id);
      demoArray.splice(index, 1);
    } else {
      demoArray.push(id);
    }
    // if (id === "all") {
    //   demoArray = ["all", 1, 2, 3, 4, 5];
    // } else {
    //   const index = demoArray.findIndex((x) => x === "all");
    //   demoArray.splice(index);
    // }
    setFilterData(demoArray);
    handleSelectFilter(demoArray);
  };
  return (
    <>
      <div className="row d-flex align-items-center justify-content-between">
        <div>
          <div className="row align-items-center ml-0 mr-0 d-flex">
            <h5 className="card-title  m-3 my-0">{title}</h5>
            {/* {isFilter ? (
              <CustomeDropDown
                id="property"
                className="filter-selector"
                filterDropdown
                placeholder="Task Status"
                data={Job_status_Items}
                // value={JOB_STATUS(row.job_status)}
                value={filterValue}
                onSelect={handleSelectFilter}
              />
            ) : (
              <></>
            )} */}
          </div>
        </div>
        <div className="d-flex align-items-center mr-3">
          <div className={`search-wrapper ${isOpen ? "active" : ""}`}>
            <div className="input-holder">
              <input
                type="text"
                className="search-input"
                placeholder="Type to search"
                value={search}
                onChange={handelSearch}
              />
              <button className="search-icon" onClick={handleSearchClose}>
                <span />
              </button>
            </div>
            <button className="close" onClick={handleSearchClose} />
          </div>
          {isFilter ? (
            <div>
              <div className="input-holder">
                <button
                  className="filter-btn-cutom"
                  onClick={() => setFilter(!filter)}
                >
                  {/* //onclick="filterBtn()" */}
                  <i className="fas fa-filter" />
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className="row"
        id="filterDiv"
        style={{ display: !filter ? "none" : "block" }}
      >
        <div className="col-md-12 custom-filter">
          {/* <h5 className="card-title mb-3 text-center">Task Filter</h5> */}
          <ul>
            {/* <li
              className={`${filterData.includes("all") ? "active" : ""}`}
              onClick={() => handleSelectFilters("all")}
            >
              <div>All</div>
            </li> */}
            <li
              className={`${
                filterData.includes(1) || filterData.includes("all")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelectFilters(1)}
            >
              <div>Job Under Process</div>
            </li>
            <li
              className={`${
                filterData.includes(2) || filterData.includes("all")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelectFilters(2)}
            >
              <div>Job Under Query</div>
            </li>
            <li
              className={`${
                filterData.includes(3) || filterData.includes("all")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelectFilters(3)}
            >
              <div>Job Completed</div>
            </li>
            <li
              className={`${
                filterData.includes(4) || filterData.includes("all")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelectFilters(4)}
            >
              <div>Job Under Review</div>
            </li>
            <li
              className={`${
                filterData.includes(5) || filterData.includes("all")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleSelectFilters(5)}
            >
              <div>JOB NOT STARTED</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

TableHeader.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  search: PropTypes.string,
  handelSearch: PropTypes.func,
  handleSearchClose: PropTypes.func,
  isFilter: propTypes.bool,
  filterValue: propTypes.string,
  handleSelectFilter: propTypes.func,
};

TableHeader.defaultProps = {
  title: "",
  isOpen: false,
  search: "",
  handelSearch: () => {},
  handleSearchClose: () => {},
  isFilter: false,
  filterValue: "",
  handleSelectFilter: () => {},
};

export default TableHeader;
