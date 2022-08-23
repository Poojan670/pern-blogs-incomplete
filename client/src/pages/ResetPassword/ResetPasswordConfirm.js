import React, { useState } from "react";
// import "../Login/login.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import TextError from "../../components/TextError/TextError";
import { useDispatch, useSelector } from "react-redux";
import { confirmPassword } from "../../Redux/Auth/thunk";
import Spinner from "../../components/Spinner/Spinner";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const ResetPasswordConfirm = (props) => {
  let history = useHistory();
  // props
  const loading_reset = useSelector((state) => state.auth.loading_reset);
  const dispatch = useDispatch();
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");

  //initial values of form field in formik
  const initialValues = {
    password: "",
    confirm_password: "",
  };
  //validation rule for the form field in formik
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please Enter your password")
      .matches(
        /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One alphabet and One Number "
      ),
    confirm_password: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });
  //submit handler for formik
  const onSubmit = (values) => {
    const { password, confirm_password } = values;
    const token = props.match.params.token;
    dispatch(confirmPassword(password, confirm_password, token, history));
  };
  // toggle password
  const handleClick = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  // toggle confirm password
  const handleClick1 = () => {
    if (type1 === "password") {
      setType1("text");
    } else {
      setType1("password");
    }
  };
  return (
    <div className="account-pages my-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card overflow-hidden">
              <div className="bg-primary bg-soft">
                <div className="row">
                  <div className="col-sm-7">
                    <div className="text-white p-4">
                      <h5 className="text-white">Choose a New Password</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="p-2">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form autoComplete="off" className="form-horizontal ">
                          <div className="mb-3  password-field">
                            <label htmlFor="password" className="form-label ">
                              New Password
                            </label>
                            <div style={{ position: "relative" }}>
                              <Field
                                type={type}
                                className="form-control "
                                name="password"
                                placeholder="New Password"
                              />
                              <span onClick={handleClick}>
                                {type === "password" ? (
                                  <BsFillEyeSlashFill />
                                ) : (
                                  <BsFillEyeFill />
                                )}
                              </span>
                            </div>
                            <ErrorMessage
                              name="password"
                              component={TextError}
                            />
                          </div>
                          <div className="mb-3  password-field">
                            <label
                              htmlFor="confirm_password"
                              className="form-label "
                            >
                              Confirm New Password
                            </label>
                            <div style={{ position: "relative" }}>
                              <Field
                                type={type1}
                                className="form-control "
                                name="confirm_password"
                                placeholder=" Confirm New Password"
                              />
                              <span onClick={handleClick1}>
                                {type1 === "password" ? (
                                  <BsFillEyeSlashFill />
                                ) : (
                                  <BsFillEyeFill />
                                )}
                              </span>
                            </div>
                            <ErrorMessage
                              name="confirm_password"
                              component={TextError}
                            />
                          </div>
                          <div className="mt-3 d-grid">
                            <button
                              className="btn btn-primary waves-effect waves-light mt-4 m-3"
                              type="submit"
                              disabled={loading_reset}
                            >
                              Reset Password {loading_reset && <Spinner />}
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div>
                <p>©2021 Inventory Management System.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
