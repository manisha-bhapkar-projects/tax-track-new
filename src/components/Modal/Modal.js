import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import SelectFileInput from "./SelectFileInput/SelectFileInput";
// import DemoData from "../../utils/demoData";
import fetchClient from "../../utils/axiosConfig";
import constants from "../../utils/constants";
import Loader from "react-loader-spinner";
import { CustomeNotification } from "../CustomeNotification/CustomeNotification";

function ModalComponent({ isOpen, onCancelClickListner, clientId }) {
  const [modalData, setModalData] = useState([]); //DemoData.FileUploadData
  const [fileName, setFileName] = useState("");
  const [signedDocument, setSignedDocument] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClient.get(constants.API.MODEL.LIST).then((_res) => {
      if (_res.data.status) {
        const data = _res.data.result.map((x, index) => {
          return index === 0
            ? { ...x, status: "current", count: index + 1 }
            : { ...x, status: "", count: index + 1 };
        });
        setModalData(data);

        // setModalData(_res.data.result)
      }
    });
  }, []);
  const handleClickNext = async (dataId) => {
    let stepsData = [...modalData];
    const currentSelected = stepsData.findIndex(
      ({ status }) => status === "current"
    );
    if (fileName) {
      setLoading(true);
      const data = new FormData();
      data.append("data", signedDocument);
      await fetchClient
        .post(`${constants.API.FILE_UPLOAD.ZIPFILE}${clientId}`, data, {
          params: {
            data_id: dataId,
          },
        })
        .then((res) => {
          if (res.data.status) {
            setLoading(false);
            CustomeNotification(
              "success",
              res.data.message,
              "File Upload",
              2000
            );
            setFileName("");
            setSignedDocument({});
          } else {
            return null;
          }
        })
        .catch(() => {
          return null;
        });
    } else {
      CustomeNotification("error", "Please Select File", "Error", 2000);
      return null;
    }

    
    stepsData[currentSelected].status = "compelted";
    stepsData[currentSelected + 1].status = "current";
    setModalData(stepsData);
  };

  // const uploadFile = (data, dataId) => {
  //   fetchClient
  //     .post(`${constants.API.FILE_UPLOAD.ZIPFILE}${clientId}`, data, {
  //       params: {
  //         data_id: dataId,
  //       },
  //     })
  //     .then((res) => {
  //       if (res.data.status) {
  //         setLoading(false);
  //         setFileName("");
  //         setSignedDocument({});
  //       } else {
  //         return null;
  //       }
  //     })
  //     .catch(() => {
  //       return null;
  //     });
  // };
  const handleSelectFile = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setSignedDocument(files[0]);
      setFileName(files[0].name);
    }
  };
  const handleClickSkip = () => {
    let stepsData = [...modalData];
    const currentSelected = stepsData.findIndex(
      ({ status }) => status === "current"
    );
    CustomeNotification("info", "Skip and Continue", "Information", 2000);
    setFileName("");
    setSignedDocument({});
   
    stepsData[currentSelected].status = "compelted";
    stepsData[currentSelected + 1].status = "current";
    setModalData(stepsData);
  };
  const handleClickComplete = async (dataId) => {
    let stepsData = [...modalData];
    const currentSelected = stepsData.findIndex(
      ({ status }) => status === "current"
    );
    if (fileName) {
      setLoading(true);
      const data = new FormData();
      data.append("data", signedDocument);
      await fetchClient
        .post(`${constants.API.FILE_UPLOAD.ZIPFILE}${clientId}`, data, {
          params: {
            data_id: dataId,
          },
        })
        .then((res) => {
          if (res.data.status) {
            CustomeNotification(
              "success",
              "All File upload Task end",
              "File Upload",
              2000
            );
            setLoading(false);
            setFileName("");
            setSignedDocument({});
          } else {
            return null;
          }
        })
        .catch(() => {
          return null;
        });
    } else {
      CustomeNotification("error", "Please Select File", "Error", 2000);
      return null;
    }

    stepsData[currentSelected].status = "compelted";
    stepsData[0].status = "current";
    setModalData(stepsData);
    onCancelClickListner();
  };

  const handleClickPrevious = () => {
    let stepsData = [...modalData];
    const currentSelected = stepsData.findIndex(
      ({ status }) => status === "current"
    );
    setFileName("");
    setSignedDocument({});
    stepsData[currentSelected].status = "compelted";
    stepsData[currentSelected - 1].status = "current";
    setModalData(stepsData);
  };

  return (
    <Modal show={isOpen} onHide={onCancelClickListner}>
      <Modal.Header closeButton>
        <Modal.Title>Add Income Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <div className="loader-center text-center py-5">
            <Loader
              className="custome-loader"
              type="Puff"
              color="#1E447B"
              height={100}
              width={100}
              timeout={3000000} //3 secs
            />
          </div>
        ) : (
          modalData.map((item, index) => {
            if (item.status === "current") {
              return (
                <div className="modal-split" key={index}>
                  <h2>{item.name}</h2>
                  <div className="custom-file-upload">
                    <SelectFileInput
                      fileName={fileName}
                      handleSelectFile={(e) =>
                        handleSelectFile(e, item.data_id)
                      }
                    />
                  </div>
                </div>
              );
            }

            return null;
          })
        )}
      </Modal.Body>
      <Modal.Footer>
        {loading ? (
          <></>
        ) : (
          modalData.map((item, index) => {
            if (
              item.count > 1 &&
              item.count !== modalData.length &&
              item.status === "current"
            ) {
              return (
                <div key={index}>
                  <Button
                    variant="secondery mx-2"
                    onClick={handleClickPrevious}
                  >
                    Previous
                  </Button>
                  <Button variant="secondery mx-2" onClick={handleClickSkip}>
                    Skip
                  </Button>
                  <Button
                    variant="primary ml-2"
                    onClick={() => handleClickNext(item.data_id)}
                  >
                    Next
                  </Button>
                </div>
              );
            }

            if (item.count === modalData.length && item.status === "current") {
              return (
                <div key={index}>
                  <Button
                    variant="secondery mx-2"
                    onClick={handleClickPrevious}
                  >
                    Previous
                  </Button>

                  <Button
                    variant="primary ml-2"
                    onClick={() => handleClickComplete(item.data_id)}
                  >
                    Submit
                  </Button>
                </div>
              );
            }
            if (item.count !== modalData.length && item.status === "current") {
              return (
                <div key={index}>
                  <Button variant="secondery mx-2" onClick={handleClickSkip}>
                    Skip
                  </Button>
                  <Button
                    variant="primary ml-2"
                    onClick={() => handleClickNext(item.data_id)}
                  >
                    Next
                  </Button>
                </div>
              );
            }

            return null;
          })
        )}
      </Modal.Footer>
    </Modal>
  );
}

// ModalComponent.propTypes = {};

export default ModalComponent;
