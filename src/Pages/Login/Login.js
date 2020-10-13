import React, { useState, useRef } from "react";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { storeAuthToken } from "../../utils/storage";
import { callLoginApi } from "../../actions/AuthAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReCAPTCHA from "react-google-recaptcha";
import TextFieldComponent from "../../components/TextFieldComponent/TextFieldComponent";
import { CustomeNotification } from "../../components/CustomeNotification copy/CustomeNotification";

const Login = (props) => {
  const recaptchaRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  const [recaptcha, setrecaptcha] = useState("");
  const [isError, setIsError] = useState({});
  const [isFocus, setIsFocus] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(initialValues);
    setIsError(validation);
    props
      .callLoginApiAction(initialValues, recaptcha)
      .then((_res) => {
        setrecaptcha("");
        if (_res.data.status) {
          storeAuthToken(_res.data.result.token);
          history.push(constants.ROUTE.SIDEBAR.DASHBORD);
          CustomeNotification("success", _res.data.message, "Success", 2000);
        } else {
          recaptchaRef.current.reset();
          CustomeNotification("error", _res.data.message, "Error", 2000);
        }
      })
      .catch((error) => {
        setrecaptcha("");
        recaptchaRef.current.reset();
        let errors = {};
        if (error.response.status === 400) {
          let result = error.response.data.result;
          if ("email" in result) {
            errors.email = result.email.message;
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
        // setrecaptcha("");
      });
  };

  const handleChangeValue = (e) => {
    setInitialValues({
      ...initialValues,
      [e.target.name]: e.target.value.trim(),
    });
    setIsError({ ...isError, [e.target.name]: "" });
  };
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "email is Required";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    }
    return errors;
  };

  function onChange(value) {
    setrecaptcha(value);
  }
  const handleFocus = (e) => {
    const validation = validate(initialValues);
    setIsError(validation);
    setIsFocus({ ...isFocus, [e.target.name]: true });
  };

  return (
    <section className="login-home_section ">
      <div className="row ml-0 mr-0 d-flex align-items-center login-row">
        <div className="col-md-6 login-banner"></div>
        <div className="col-md-6">
          <div className="login-form">
            <div className="text-center mb-5">
              <img src={require("../../assets/images/logo.png")} alt="logo" />
            </div>
            <div className="mb-5 text-center">
              <h1>Login</h1>
            </div>
            <form className="pr-5 pl-5">
              <div className="form-group login-form">
                <div className="row d-flex align-items-center">
                  <div className="col-1 text-center">
                    <i className="nav-link-icon fa fa-user"> </i>
                  </div>
                  <div className="col-11">
                    <TextFieldComponent
                      type="text"
                      name="email"
                      id="email"
                      placeholder="User Name"
                      // className="form-control"
                      value={initialValues.email}
                      onBlur={handleFocus}
                      onChange={handleChangeValue}
                      error={isError.email && isFocus.email ? true : false}
                      helperText={isError.email}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row d-flex align-items-center">
                  <div className="col-1 text-center">
                    <i className="nav-link-icon fa fa-asterisk"> </i>
                  </div>
                  <div className="col-11 pass-login">
                    <TextFieldComponent
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="userPassword"
                      placeholder="Password"
                      value={initialValues.password}
                      onChange={handleChangeValue}
                      onBlur={handleFocus}
                      // onFocus={handleFocus}
                      error={
                        isError.password && isFocus.password ? true : false
                      }
                      helperText={isError.password}
                    />

                    <div
                      className="show-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className="nav-link-icon fa fa-eye"> </i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="robot text-center my-4">
                <ReCAPTCHA
                  className="ReCAPTCHA-custom"
                  ref={recaptchaRef}
                  sitekey="6Lfxec8ZAAAAAAD3NQQKy-c9FcFQZR5UdTFigref"
                  onChange={onChange}
                />
              </div>
              <div className="form-group text-center">
                <button
                  className="btn-cutom btn"
                  disabled={
                    recaptcha !== "" &&
                    initialValues.email !== "" &&
                    initialValues.password !== ""
                      ? false
                      : true
                  }
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      callLoginApiAction: callLoginApi,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Login);
