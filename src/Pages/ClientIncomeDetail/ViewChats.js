// import React, { useState, useEffect } from "react";
import React from "react";

import io from "socket.io-client";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
import moment from "moment";
import Loader from "react-loader-spinner";

// const ViewChats = (props) => {
//   const [chatHistory, setChat] = useState([]);
//   const [typing, setTyping] = useState("");
//   const [connection, setConnection] = useState(false);

//   const socket = io(process.env.REACT_APP_API_BASEURL, {
//     path: "/taxtrak/api/chat/socket.io/",
//   });
//   useEffect(() => {
//     fetchClient
//       .get(`${constants.API.PROFILE.CHAT}${props.clientId}`)
//       .then((_res) => {
//         if (_res.data.status) {
//           setChat(_res.data.result).then(() => {
//             var div = document.getElementById("messages");
//             div.scrollTop = div.scrollHeight - div.clientHeight;
//           });
//         }
//       })
//       .catch(() => {
//         setChat([]);
//       });

//     socket.io.reconnectionAttempts(1);
//     socket.on("connect_error", (socket) => {
//     });
//     socket.on("connect", (socket) => {
//       setConnection(true);
//     });
//     socket.emit("room", `room-taxtrack-${props.clientId}`);
//     socket.on("message", (response) => {
//       let chat = chatHistory;
//       chat.push(response);
//       setChat(chat);

//       var div = document.getElementById("messages");
//       div.scrollTop = div.scrollHeight - div.clientHeight;
//     });
//   }, []);
//   const handleSendMsg = async (e) => {
//     e.preventDefault();
//     if (typing) {
//       // this.socket.emit("room", `room-taxtrack-${props.clientId}`);
//       socket.emit("message", {
//         message: typing,
//         role: 2,
//       });
//     }
//     setTyping("");

//     var div = document.getElementById("messages");
//     div.scrollTop = div.scrollHeight - div.clientHeight;

//   };

//   return connection ? (
//     <div className="message-section-view-page">
//       <div className="chat-box-title">
//         <h4>{props.chatName || "Messages"}</h4>
//       </div>
//       <div className="mesgs">
//         <div className="msg_history" id="messages">
//           {chatHistory.map((chat) => {
//             return chat.role === 1 ? (
//               <div className="message-orange">
//                 <p className="message-content">{chat.message}</p>
//                 <div className="message-timestamp-right pr-1">
//                   SMS {moment().format("h:mm")}
//                 </div>
//               </div>
//             ) : (
//               <div className="message-blue">
//                 <p className="message-content">{chat.message}</p>
//                 <div className="message-timestamp-left">
//                   SMS {moment().format("h:mm")}{" "}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="type_msg">
//           <form className="input_msg_write">
//             <input
//               type="text"
//               className="write_msg"
//               placeholder="Enter message to send"
//               value={typing}
//               onChange={(e) => {
//                 setTyping(e.target.value);
//               }}
//               id="send_text"
//             />
//             <button
//               className="msg_send_btn"
//               type="submit"
//               id="send_msg"
//               onClick={handleSendMsg}
//             >
//               <img
//                 src={require("../../assets/images/send.png")}
//                 alt="send"
//                 style={{ width: 35, margin: "10px 0px 10px -5px" }}
//               />
//             </button>
//             {/* <button
//               className="msg_upload_btn"
//               type="button"
//               id="send_msg"
//               data-toggle="modal"
//               data-target="#data-add-modal-one"
//             >
//               <i className="fa fa-upload" />
//             </button> */}
//           </form>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div
//       style={{ padding: 150 }}
//       className="loader-center card text-center  align-self-center"
//     >
//       <Loader
//         className="custome-loader"
//         type="Puff"
//         color="#1E447B"
//         height={100}
//         width={100}
//         timeout={3000000} //3 secs
//       />
//     </div>
//   );
// };

class ViewChats extends React.Component {
  state = {
    chatHistory: [],
    typing: "",
    connection: false,
  };

  componentDidMount() {
    fetchClient
      .get(`${constants.API.PROFILE.CHAT}${this.props.clientId}`)
      .then((_res) => {
        if (_res.data.status) {
          this.setState(
            {
              ...this.state,
              chatHistory: _res.data.result,
            },
            () => {
              var div = document.getElementById("messages");
              if (div) {
                div.scrollTop = div.scrollHeight - div.clientHeight;
              }
            }
          );
        }
      })
      .catch(() => {
        this.setState({
          ...this.state,
          chatHistory: [],
        });
      });
    this.socket = undefined;
    this.socket = io(process.env.REACT_APP_API_BASEURL, {
      path: "/taxtrak/api/chat/socket.io/",
    });
    this.socket.io.reconnectionAttempts(1);
    this.socket.on("connect_error", (socket) => {});
    this.socket.on("connect", (socket) => {
      this.setState({
        ...this.state,
        connection: true,
      });
    });
    this.socket.emit("room", `room-taxtrack-${this.props.clientId}`);
    this.socket.on("message", (response) => {
      // console.log(response);
      let chat = this.state.chatHistory;
      chat.push(response);
      this.setState({
        ...this.state,
        chatHistory: chat,
      });
      var div = document.getElementById("messages");
      if (div) {
        div.scrollTop = div.scrollHeight - div.clientHeight;
      }
    });
  }
  
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.clientId !== prevProps.clientId) {
      this.socket.close();
      this.componentDidMount();
    }
  }

  componentWillUnmount(){
    
  }

  handleSendMsg = async (e) => {
    e.preventDefault();
    if (this.state.typing) {
      // this.socket.emit("room", `room-taxtrack-${this.props.clientId}`);
      this.socket.emit("message", {
        message: this.state.typing,
        role: 2,
      });
    }

    this.setState({
      ...this.state,
      typing: "",
    });

    var div = document.getElementById("messages");
    if (div) {
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  };

  render() {
    return this.state.connection ? (
      <div className="message-section-view-page">
        <div className="chat-box-title">
          <h4>{this.props.chatName || "Messages"}</h4>
        </div>
        <div className="mesgs">
          <div className="msg_history" id="messages">
            {this.state.chatHistory.map((chat,index) => {
              return chat.role === 2 ? (
                <div className="message-orange" key={index}>
                  <p className="message-content">{chat.message}</p>
                  <div className="message-timestamp-right pr-1">
                    SMS {moment(chat.timestamp).format("h:mm")}
                  </div>
                </div>
              ) : (
                <div className="message-blue" key={index}>
                  <p className="message-content">{chat.message}</p>
                  <div className="message-timestamp-left">
                    SMS {moment(chat.timestamp).format("h:mm")}{" "}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="type_msg">
            <form className="input_msg_write">
              <input
                type="text"
                className="write_msg"
                placeholder="Enter message to send"
                value={this.state.typing}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    typing: e.target.value,
                  });
                }}
                id="send_text"
              />
              <button
                className="msg_send_btn"
                type="submit"
                id="send_msg"
                onClick={this.handleSendMsg}
              >
                <img
                  src={require("../../assets/images/send.png")}
                  alt="send"
                  style={{ width: 35, margin: "10px 0px 10px -5px" }}
                />
              </button>
              {/* <button
              className="msg_upload_btn"
              type="button"
              id="send_msg"
              data-toggle="modal"
              data-target="#data-add-modal-one"
            >
              <i className="fa fa-upload" />
            </button> */}
            </form>
          </div>
        </div>
      </div>
    ) : (
      <div
        style={{ padding: 150 }}
        className="loader-center card text-center  align-self-center"
      >
        <Loader
          className="custome-loader"
          type="Puff"
          color="#1E447B"
          height={100}
          width={100}
          timeout={3000000} //3 secs
        />
      </div>
    );
  }
}

export default ViewChats;
