import React, { useState } from "react";
import { callAddStaffApi } from "../../actions/StaffAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import constants from "../../utils/constants";
import { CustomeNotification } from "../../components/CustomeNotification copy/CustomeNotification";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { validationNameWithRegex } from "../../utils/validation";

const AddStaffUser = (props) => {
  const history = useHistory();
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const [staff, setStaff] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneno: "",
  });
  const handleAddStaff = (e) => {
    setIsFocus({
      fname: true,
      lname: true,
      email: true,
      password: true,
      phoneno: true,
    });
    e.preventDefault();
    props
      .callAddStaffApiAction(staff)
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
          if ("fname" in result) {
            errors.fname = result.fname.message;
          }
          if ("lname" in result) {
            errors.lname = result.lname.message;
          }
          if ("email" in result) {
            errors.email = result.email.message;
          }
          if ("phoneno" in result) {
            errors.phoneno = result.phoneno.message;
          }
          if ("password" in result) {
            errors.password = result.password.message;
          }
        }
        setIsError(errors);
        CustomeNotification(
          "error",
          error.response.data.message,
          "Error",
          2000
        );
        Object.values(error.response.data.result).map((x) => {
          return CustomeNotification(
            "error",
            x.message,
            "Validation Error",
            2000
          );
        });
      });
  };
  const validate = (values) => {
    let errors = {};

    if (!values.email.trim()) {
      errors.email = "email is Required";
    }
    if (!values.fname.trim()) {
      errors.fname = "First name is Required";
    }
    if (!values.lname.trim()) {
      errors.lname = "Last name is Required";
    }
    if (!values.phoneno.trim()) {
      errors.phoneno = "phone number is Required";
    }
    if (!values.password.trim()) {
      errors.password = "Password is Required";
    }
    return errors;
  };
  const handleFocus = (e) => {
    const validation = validate(staff);
    setIsError(validation);
    setIsFocus({ ...isFocus, [e.target.name]: true });
  };
  const handleChangeValue = (e) => {
    if (e.target.name === "phoneno") {
      if (
        validationNameWithRegex(
          e.target.value,
          constants.REGEX_PATTERN.NUMBER
        ) ||
        e.target.value === ""
      ) {
        setStaff({
          ...staff,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setStaff({
        ...staff,
        [e.target.name]: e.target.value,
      });
    }
    setIsError({ ...isError, [e.target.name]: "" });
  };

  const handleChangeValueBlur = (e) => {
    if (e.target.name === "password") {
      if (
        validationNameWithRegex(
          e.target.value,
          constants.REGEX_PATTERN.NUMBER
        ) ||
        e.target.value === ""
      ) {
        setStaff({
          ...staff,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setStaff({
        ...staff,
        [e.target.name]: e.target.value.trim(),
      });
    }
    setIsError({ ...isError, [e.target.name]: "" });
  };

  return (
    <div className="main-card mb-3 card">
      <div className="card-body">
        <div className="row  align-items-center justify-content-between mb-4">
          <div className="col-md-6">
            <h5 className="card-title">Add Staff</h5>
          </div>
          <div className="col-md-3 text-right"></div>
        </div>
        <div>
          <div>
            <div
              className="row align-items-center disable-company-profile"
              id="mydivenable"
            >
              <div className="col-md-12">
                <div className="company-profile-form ">
                  <div className="form-group">
                    <TextFieldComponent
                      type="text"
                      name="fname"
                      id="fname"
                      placeholder="User Name"
                      label="Frist Name"
                      value={staff.fname}
                      // onBlur={handleFocus}
                      onChange={handleChangeValue}
                      onBlur={(e) => {
                        handleChangeValueBlur(e);
                        handleFocus(e);
                      }}
                      error={isError.fname && isFocus.fname ? true : false}
                      helperText={isError.fname}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      type="text"
                      name="lname"
                      id="lname"
                      placeholder="Enter Last Name"
                      label="Last Name"
                      value={staff.lname}
                      // onBlur={handleFocus}
                      onChange={handleChangeValue}
                      onBlur={(e) => {
                        handleChangeValueBlur(e);
                        handleFocus(e);
                      }}
                      error={isError.lname && isFocus.lname ? true : false}
                      helperText={isError.lname}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter Email Address"
                      label="Email Address"
                      value={staff.email}
                      // onBlur={handleFocus}
                      onChange={handleChangeValue}
                      onBlur={(e) => {
                        handleChangeValueBlur(e);
                        handleFocus(e);
                      }}
                      error={isError.email && isFocus.email ? true : false}
                      helperText={isError.email}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      type="text"
                      name="phoneno"
                      id="phoneno"
                      placeholder="Enter Number"
                      label="Phone Number"
                      value={staff.phoneno}
                      // onBlur={handleFocus}
                      onChange={handleChangeValue}
                      onBlur={(e) => {
                        handleChangeValueBlur(e);
                        handleFocus(e);
                      }}
                      error={isError.phoneno && isFocus.phoneno ? true : false}
                      helperText={isError.phoneno}
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldComponent
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password"
                      label="Password"
                      value={staff.password}
                      // onBlur={handleFocus}
                      onChange={handleChangeValue}
                      onBlur={(e) => {
                        handleChangeValueBlur(e);
                        handleFocus(e);
                      }}
                      error={
                        isError.password && isFocus.password ? true : false
                      }
                      helperText={isError.password}
                    />
                  </div>
                  <div className="form-group text-center">
                    <input
                      type="submit"
                      className="btn-secondery"
                      defaultValue="Submit"
                      onClick={handleAddStaff}
                    />
                  </div>
                </div>
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
      callAddStaffApiAction: callAddStaffApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(AddStaffUser);
