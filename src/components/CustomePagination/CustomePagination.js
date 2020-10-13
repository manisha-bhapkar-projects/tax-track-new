import React, { useState, useEffect } from "react";
import "./CustomePagination.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function CustomePagination({ totalLength, onPageChangedCalled, limit }) {
  const [pageNo, setPageNo] = useState(1);
  const countTotalPage = totalLength / limit;
 
  useEffect(() => {
    setPageNo(1);
  }, [totalLength]);
  const TotalPages = Math.ceil(countTotalPage);
  const NextPage = () => {
    if (TotalPages !== pageNo) {
      window.scrollTo(0, 0);
      const page = pageNo + 1;
      setPageNo(page);
      onPageChangedCalled(page);
    }
  };
  const PreviousPage = () => {
    if (pageNo !== 1) {
      window.scrollTo(0, 0);
      const page = pageNo - 1;
      setPageNo(page);
      onPageChangedCalled(page);
    }
  };

  const getPageNumbers = (totalPages) => {
    const arr = [];
    for (let i = 1; i <= totalPages; i += 1) {
      arr.push(i);
    }
    return arr;
  };
  const selectPageNumber = (_pageNo) => {
    window.scrollTo(0, 0);
    setPageNo(_pageNo);
    onPageChangedCalled(_pageNo);
  };
  return (
    <div className="custome-pagination">
      <ul className="pagination pagination-home">
        <div className="mx-auto d-flex">
          <li
            className={`paginate_button page-item previous ${
              pageNo === 1 ? "disabled" : ""
            }`}
          >
            {/* disabled */}
            <div
              className="pagination-number"
              onKeyDown={PreviousPage}
              onClick={PreviousPage}
              tabIndex="0"
              role="button"
            >
              &lt;
            </div>
          </li>

          
          {getPageNumbers(TotalPages).map((_page) => {
            if (
              (_page >= pageNo - 1 && _page <= pageNo + 1) ||
              _page === TotalPages ||
              _page === 1
            ) {
              if (_page === pageNo) {
                return (
                  <li className="active" key={_page}>
                    <div className="pagination-number">{_page}</div>
                  </li>
                );
              }
              return (
                <li
                  className=""
                  onClick={() => {
                    selectPageNumber(_page);
                  }}
                  onKeyDown={() => {
                    selectPageNumber(_page);
                  }}
                  tabIndex="0"
                  role="button"
                  key={_page}
                >
                  <div className="pagination-number">{_page}</div>
                </li>
              );
            }
            if (_page > pageNo - 4 && _page < pageNo + 4) {
              return <div className="pagination-dot" key={_page}>.</div>;
            }
            return <></>;
          })}

          <li
            className={`paginate_button page-item next ${
              getPageNumbers(TotalPages).length === pageNo ? "disabled" : ""
            }`}
          >
            <div
              className="pagination-number"
              onKeyDown={NextPage}
              onClick={NextPage}
              tabIndex="0"
              role="button"
            >
              &gt;
            </div>
          </li>
        </div>
      </ul>
    </div>
  );
}

CustomePagination.propTypes = {
  totalLength: PropTypes.number.isRequired,
  onPageChangedCalled: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};
const mapStateToProps = () => ({});

export default connect(mapStateToProps, null)(CustomePagination);
