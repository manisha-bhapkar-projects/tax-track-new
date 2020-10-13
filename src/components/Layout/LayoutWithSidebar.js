import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const LayoutwithSidebar = ({ children, parentCallback }) => {
  return (
    <>
      <Header onSidebarClick={parentCallback} />
      <div className="app-main">
        <Sidebar onSidebarClick={parentCallback} />
        <div className="app-main__outer">
          <div className="app-main__inner">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

LayoutwithSidebar.propTypes = {};

export default LayoutwithSidebar;
