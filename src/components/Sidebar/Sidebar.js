import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  adminSideBarRoutes,
  staffSideBarRoutes,
} from "../../utils/routes";
import { getUserDetails } from "../../utils/storage";

const Sidebar = (props) => {
  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="app-header__logo">
        <div className="logo-src"/>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
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
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu custom-menu">
            {getUserDetails().role === 2
              ? adminSideBarRoutes.map((item, index) => {
                  return item.sidebar ? (
                    <li key={index}>
                      <NavLink to={item.path}>
                        <i className={item.icon}></i>
                        {item.title}
                      </NavLink>
                    </li>
                  ) : null;
                })
              : staffSideBarRoutes.map((item, index) => {
                  return item.sidebar ? (
                    <li key={index}>
                      <NavLink to={item.path}>
                        <i className={item.icon}></i>
                        {item.title}
                      </NavLink>
                    </li>
                  ) : null;
                })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Sidebar);
