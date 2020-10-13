import React, { useState, useEffect } from "react";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
import ViewChats from "../ClientIncomeDetail/ViewChats";

const Messages = () => {
  const [isSelected, setIsSelected] = useState("");
  const [chatMember, setChatMember] = useState([]);
  const [memberData, setMemberData] = useState({});
  useEffect(() => {
    fetchClient
      .get(constants.API.PROFILE.LIST)
      .then((res) => {
        if (res.data.status) {
          setChatMember(res.data.result);
          if (res.data.result && res.data.result.length) {
            setIsSelected(res.data.result[0].task_id);
            setMemberData(res.data.result[0]);
          }
        }
      })
      .catch(() => {});
  }, []);
  const handleSelectChat = (id, member) => {
    setIsSelected(id);
    setMemberData(member);
  };

  return (
    <div className="main-card mb-3 card">
      <div className="card-body">
        <div className="row message-page-custom">
          {chatMember && chatMember.length ? (
            <>
              <div className="col-md-4">
                <ul
                  className="tabs-animated-shadow tabs-animated nav custom-tab-hight"
                  style={{ display: "block" }}
                >
                  {chatMember.map((member) => {
                    return (
                      <li
                        className="nav-item"
                        key={member.task_id}
                        onClick={() => {
                          handleSelectChat(member.task_id, member);
                        }}
                      >
                        <div
                          role="tab"
                          className={`nav-link show ${
                            isSelected === member.task_id ? "active" : ""
                          }`}
                          id="tab-c-0"
                          data-toggle="tab"
                          aria-selected="false"
                        >
                          <img
                            src={member.company_logo}
                            className="rounded-circle mr-3"
                            alt="logo"
                          />
                          &nbsp; <span>{member.task_name}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-md-8">
                {isSelected ? (
                  <ViewChats
                    clientId={isSelected}
                    chatName={memberData.task_name}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <div className="custom-tab-hight text-center col-12">
              <h5 style={{ marginTop: "180px" }}>No Data Found</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
