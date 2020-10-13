import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import {
  callAddClientApi,
  callUploadFile,
} from "../../actions/AddClientAction";
import { CustomeNotification } from "../../components/CustomeNotification copy/CustomeNotification";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { validationNameWithRegex } from "../../utils/validation";
import Loader from "react-loader-spinner";

const AddClientUser = (props) => {
  const history = useHistory();
  const [getProfile, changeProfile] = useState({
    company_name: "Initor Global.co.uk",
    company_owner_fname: "",
    company_owner_lname: "",
    company_logo: "",
    email: "",
    phoneno: "",
    password: "",
  });
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const handleAddClient = (e) => {
    e.preventDefault();
    props
      .callAddClientApiAction(getProfile)
      .then((_res) => {
        if (_res.data.status) {
          history.push(constants.ROUTE.SIDEBAR.DASHBORD);
          CustomeNotification("success", _res.data.message, "Success", 2000);
        } else {
          CustomeNotification("error", _res.data.message, "Error", 2000);
        }
      })
      .catch((error) => {
        let errors = {};
        if (error.response.status === 400) {
          let result = error.response.data.result;
          if ("company_name" in result) {
            errors.company_name = result.company_name.message;
          }
          if ("company_owner_fname" in result) {
            errors.company_owner_fname = result.company_owner_fname.message;
          }
          if ("company_owner_lname" in result) {
            errors.company_owner_lname = result.company_owner_lname.message;
          }
          if ("phoneno" in result) {
            errors.phoneno = result.phoneno.message;
          }
          if ("password" in result) {
            errors.password = result.password.message;
          }
          if ("email" in result) {
            errors.email = result.email.message;
          }
          CustomeNotification(
            "error",
            error.response.data.message,
            "Error",
            2000
          );
        }
        Object.values(error.response.data.result).map((x) => {
          return CustomeNotification(
            "error",
            x.message,
            "Validation Error",
            2000
          );
        });
        setIsError(errors);
      });
  };
  const handleSelectFile = (e) => {
    setIsLoading(true);
    const { files } = e.target;
    if (files.length > 0) {
      const isError = validateFile(files[0]);
      if (isError) return;
      const data = new FormData();
      data.append("profile", files[0]);
      props.callUploadFileAction(data).then((res) => {
        if (res.data.status) {
          let profile = { ...getProfile };
          profile = { ...profile, company_logo: res.data.result };
          setIsLoading(false);
          changeProfile(profile);
        }
      });
    }
  };

  const validateFile = (file) => {
    if (!/(jpe?g|png)$/.test(file.type)) {
      return true;
    }
    return false;
  };

  const handleChangeProfile = (e) => {
    let profile = { ...getProfile };
    if (e.target.name === "phoneno") {
      if (
        validationNameWithRegex(
          e.target.value,
          constants.REGEX_PATTERN.NUMBER
        ) ||
        e.target.value === ""
      ) {
        profile = { ...profile, [e.target.name]: e.target.value };
      }
    } else {
      profile = { ...profile, [e.target.name]: e.target.value };
    }
    changeProfile(profile);
  };

  const handleChangeProfileBlur = (e) => {
    let profile = { ...getProfile };
    if (e.target.name === "password") {
      if (
        validationNameWithRegex(
          e.target.value,
          constants.REGEX_PATTERN.NUMBER
        ) ||
        e.target.value === ""
      ) {
        profile = { ...profile, [e.target.name]: e.target.value };
      }
    } else {
      profile = { ...profile, [e.target.name]: e.target.value.trim() };
    }
    changeProfile(profile);
  };
  return (
    <div className="main-card mb-3 card">
      <div className="card-body">
        <div className="row  align-items-center justify-content-between mb-4">
          <div className="col-md-6">
            <h5 className="card-title">Add Employee</h5>
          </div>
          <div className="col-md-3 text-right"></div>
        </div>
        <div>
          <div>
            <div
              className="row align-items-center disable-company-profile"
              id="mydivenable"
            >
              <div className="col-md-4">
                {isLoading ? (
                  <div
                    style={{ padding: 100 }}
                    className="loader-center text-center align-self-center"
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
                ) : (
                  <div className="company-profile-logo">
                    <img
                      src={
                        getProfile.company_logo ||
                        require("../../assets/images/dummy-logo.png")
                      }
                      alt="profile"
                      className="img-fuild"
                    />
                    <div className="tab_file_Upload">
                      <label className="resume_upload" htmlFor="input-file">
                        <input
                          disabled={false}
                          id="input-file"
                          type="file"
                          title=" "
                          className="custom-file-upload-hidden"
                          accept=".png, .jpg, .jpeg"
                          // value={value}
                          name="input-file"
                          onChange={handleSelectFile}
                          // className={`${isError ? "error" : ""} form-control`}
                          placeholder={"select"}
                          // {...rest}
                        />

                        <div
                          tabIndex="-1"
                          role="button"
                          aria-controls="filename"
                          className="upload-button upload"
                          id="custom-button"
                        >
                          <i className="fa fa-upload" />
                        </div>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-8">
                <form className="company-profile-form ">
                  {/* <div className="form-group">
                    <TextFieldComponent
                      id="CompanyName"
                      label="Company Name"
                      name="company_name"
                      className=""
                      labelClassName=""
                      inputClassName=""
                      error={isError.company_name ? true : false}
                      helperText={isError.company_name}
                      helperTextClassName=""
                      isDisable={true}
                      placeholder="Enter Company Name"
                      value={getProfile.company_name}
                      onChange={handleChangeProfile}
                      onBlur={handleChangeProfileBlur}
                    />
                  </div> */}
                  <div className="form-group">
                    <TextFieldComponent
                      id="company_owner_fname"
                      label=" Owner First Name"
                      name="company_owner_fname"
                      className=""
                      labelClassName=""
                      inputClassName=""
                      error={isError.company_owner_fname ? true : false}
                      helperText={isError.company_owner_fname}
                      helperTextClassName=""
                      isDisable={false}
                      placeholder="Enter Owner Name"
                      value={`${getProfile.company_owner_fname}`}
                      onChange={handleChangeProfile}
                      onBlur={handleChangeProfileBlur}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      id="company_owner_lname"
                      label=" Owner Last Name"
                      name="company_owner_lname"
                      className=""
                      labelClassName=""
                      inputClassName=""
                      error={isError.company_owner_lname ? true : false}
                      helperText={isError.company_owner_lname}
                      helperTextClassName=""
                      isDisable={false}
                      placeholder="Enter Owner Name"
                      value={`${getProfile.company_owner_lname}`}
                      onChange={handleChangeProfile}
                      onBlur={handleChangeProfileBlur}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      id="CompanyEmail"
                      label=" Email"
                      name="email"
                      className=""
                      labelClassName=""
                      inputClassName=""
                      error={isError.email ? true : false}
                      helperText={isError.email}
                      helperTextClassName=""
                      isDisable={false}
                      placeholder="Enter Email Address"
                      value={getProfile.email}
                      onChange={handleChangeProfile}
                      onBlur={handleChangeProfileBlur}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      id="phoneno"
                      label=" Number"
                      name="phoneno"
                      className=""
                      labelClassName=""
                      inputClassName=""
                      error={isError.phoneno ? true : false}
                      helperText={isError.phoneno}
                      helperTextClassName=""
                      isDisable={false}
                      placeholder="Enter Number"
                      value={getProfile.phoneno}
                      onChange={handleChangeProfile}
                      onBlur={handleChangeProfileBlur}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      type="password"
                      id="password"
                      label="password"
                      name="password"
                      className=""
                      labelClassName=""
                      inputClassName=""
                      error={isError.password ? true : false}
                      helperText={isError.password}
                      helperTextClassName=""
                      isDisable={false}
                      placeholder="Enter Password"
                      value={getProfile.password}
                      onChange={handleChangeProfile}
                      onBlur={handleChangeProfileBlur}
                    />
                  </div>
                  <div className="form-group text-center">
                    <input
                      type="submit"
                      defaultValue="Submit"
                      className="btn-secondery"
                      onClick={handleAddClient}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callAddClientApiAction: callAddClientApi,
      callUploadFileAction: callUploadFile,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddClientUser);
