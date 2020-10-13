import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="col-md-6 col-xl-3">
      {props.pathRoute ? (
        <Link
          to={{ pathname: props.pathRoute, jobStatus: props.job }}
          // params={{ jobParam: "ashish" }}
          style={{ textDecoration: "none" }}
        >
          <div className="card mb-3 widget-content bg-custom-dashboard-box">
            <div className="widget-content-outer">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="widget-heading">{props.title}</div>
                  <div className="widget-subheading"> </div>
                </div>
                <div className="widget-content-right">
                  <div className="widget-numbers text-warning">
                    {props.value}
                  </div>
                </div>
              </div>
              {props.colorName ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div className={props.dotClass} />
                  <div style={{ fontSize: 11 }} className="text-uppercase">
                    {props.colorName}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className="card mb-3 widget-content bg-custom-dashboard-box">
          <div className="widget-content-outer">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
                <div className="widget-heading">{props.title}</div>
                <div className="widget-subheading"> </div>
              </div>
              <div className="widget-content-right">
                <div className="widget-numbers text-warning">{props.value}</div>
              </div>
            </div>
            {props.colorName ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className={props.dotClass} />
                <div style={{ fontSize: 11 }} className="text-uppercase">
                  {props.colorName}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
