import React, {  useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { callLogOutApi } from "../../actions/AuthAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import constants from "../../utils/constants";
import { storeAuthToken } from "../../utils/storage";
import { Modal, Button } from "react-bootstrap";
import fetchClient from "../../utils/axiosConfig";

const Header = ({ onSidebarClick, callLogOutApiAction }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [istoggle, setIsToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState([]);

  const history = useHistory();
  useEffect(() => {
    fetchClient.get(constants.API.PROFILE.NOTIFICATION).then((res) => {
      if (res.data.status) {
        setNotification(res.data.result);
      }
    });
  }, []);
  const handleLogOut = (e) => {
    e.preventDefault();
    callLogOutApiAction()
      .then((_res) => {

        if (_res.data.status) {
          storeAuthToken("");
          history.push(constants.ROUTE.SIDEBAR.DASHBORD);
        }
      })
      .catch(() => {
      });
  };

  // const handleToggle = (e) => {
  //     setIsToggle(!istoggle)
  // }

  const handleCollapse = (e) => {
    setIsSidebar(!isSidebar);
  };

  return (
    <div className="app-header header-shadow">
      <div className="app-header__logo">
        <div className="logo-src" />
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              onClick={() => {
                handleCollapse();
                onSidebarClick(isSidebar);
              }}
              className={`hamburger close-sidebar-btn hamburger--elastic ${
                isSidebar ? "is-active" : ""
              }`}
              data-class="closed-sidebar"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="app-header__mobile-menu">
        <div>
          <button
            type="button"
            className="hamburger hamburger--elastic mobile-toggle-nav"
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      </div>
      <div className="app-header__menu">
        <span>
          <button
            type="button"
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6" />
            </span>
          </button>
        </span>
      </div>

      <div className="app-header__content">
        <div className="app-header-left"></div>
        <div className="app-header-right">
          <div className="header-btn-lg pr-0">
            <div className="widget-content p-0">
              <div className="widget-content-wrapper">
                <div className="widget-content-left d-flex align-items-center">
                  <div
                    onClick={() => {
                      setIsToggle(true);
                    }}
                    onMouseEnter={() => {
                      setIsToggle(true);
                    }}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        setIsToggle(false);
                      }, 2000);
                    }}
                    className={`d-inline-block dropdown mr-3 custome-notification-dropdown ${
                      istoggle ? "show" : ""
                    }`}
                  >
                    <button
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                      className="btn-shadow dropdown-toggle btn btn-custom-notify"
                    >
                      <span className="btn-icon-wrapper opacity-7">
                        <i className="fa fa-bell fa-w-20" />
                      </span>
                    </button>
                    <div
                      onMouseEnter={() => {
                        setIsToggle(true);
                      }}
                      tabIndex={-1}
                      role="menu"
                      aria-hidden="true"
                      className={`dropdown-menu dropdown-menu-right notification-dropdown ${
                        istoggle ? "show" : ""
                      }`}
                      x-placement="bottom-end"
                      // style={{
                      //   position: "absolute",
                      //   willChange: "transform",
                      //   top: 8,
                      //   left: -70,
                      //   transform: "translate3d(-131px, 33px, 0px)",
                      // }}
                    >
                      <ul className="nav flex-column">
                        {notification && notification.length ? (
                          notification.map((x,index) => {
                            return (
                              <li key={index} className="nav-item">
                                <div className="nav-link">
                                  <i className="nav-link-icon lnr-inbox" />
                                  <span>{x.text}</span>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <li className="nav-item">
                            <div className="nav-link">
                              <i className="nav-link-icon lnr-inbox" />
                              <span>Empty</span>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="ml-3">
                    <div
                      onClick={() => setModal(true)}
                      style={{
                        color: "#1e447b",
                        fontSize: 30,
                        cursor: "pointer",
                      }}
                    >
                      <i className="fa fa-power-off" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to logout from taxtrak ?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="secondery mx-2" onClick={() => setModal(false)}>
            Cancel
          </Button>
          <Button variant="primary ml-2" onClick={handleLogOut}>
            Yes
          </Button>
        </Modal.Body>
        {/* <Modal.Footer>
          <div key={index}>
          
          </div>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

Header.propTypes = {};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callLogOutApiAction: callLogOutApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Header);
