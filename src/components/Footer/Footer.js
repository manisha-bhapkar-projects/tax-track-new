import React from "react";

const Footer = () => {
  return (
    <div className="app-wrapper-footer">
      <div className="app-footer">
        <div className="app-footer__inner">
          <div className="app-footer-left">
            <ul className="nav">
              <li className="nav-item">
                <p>
                  All Rights Reserved. ©{" "}
                  <a href="/" target="_blank">
                    initor global
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
