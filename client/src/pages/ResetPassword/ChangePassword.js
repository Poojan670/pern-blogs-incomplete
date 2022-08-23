import { ErrorMessage, Field, Form, Formik } from "formik";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../../Component/Footer/Footer";
import TextError from "../../Component/TextError/TextError";
import { changePassword } from "../../Redux/Auth/thunk";
import { getAllUser } from "../../Redux/User/thunk";
import "../Login/login.css";

const ChangePassword = () => {
  const users = useSelector((state) => state.user.users);
  const userid = useSelector((state) => state.auth.userid);
  const token = localStorage.getItem("accessToken");
  const decoded = jwt_decode(token);
  const dispatch = useDispatch();
  const userData = users?.find((user) =>
    user.id === decoded.user_id ? user : null
  );
  let history = useHistory();

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  const [type, setType] = useState("password");
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const initialValues = {
    password: "",
    confirm_password: "",
    old_password: "",
  };
  const user = userData?.password;
  //validation rule for the form field in formik
  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required("Old Password  is required"),
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
    const { password, old_password, confirm_password } = values;
    const id = userid;
    dispatch(
      changePassword(id, password, old_password, confirm_password, history)
    );
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
  // toggle confirm password
  const handleClick2 = () => {
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };
  return (
    <div className="login-bak">
      <div className="account-pages my-5 reset-container">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card overflow-hidden card-reset">
                <div className="bg-primary bg-soft">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center m-3">
                        <h5>Change password</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  <div className="">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {(formik) => {
                        return (
                          <Form autoComplete="off" className="form-horizontal ">
                            <div className="mb-3  password-field">
                              <label
                                htmlFor="old_password"
                                className="form-label "
                              >
                                Old Password
                              </label>
                              <div style={{ position: "relative" }}>
                                <Field
                                  type={type}
                                  className="form-control change-textfield "
                                  name="old_password"
                                  placeholder="Old Password"
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
                                name="old_password"
                                component={TextError}
                              />
                            </div>
                            <div className="mb-3  password-field">
                              <label htmlFor="password" className="form-label ">
                                New Password
                              </label>
                              <div style={{ position: "relative" }}>
                                <Field
                                  type={type2}
                                  className="form-control change-textfield "
                                  name="password"
                                  placeholder="New Password"
                                />
                                <span onClick={handleClick2}>
                                  {type2 === "password" ? (
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
                                htmlFor="confirm-password"
                                className="form-label "
                              >
                                Confirm Password
                              </label>
                              <div style={{ position: "relative" }}>
                                <Field
                                  type={type1}
                                  className="form-control change-textfield "
                                  name="confirm_password"
                                  placeholder="Confirm Password"
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
                            <div className="mt-3 d-grid text-center">
                              <button
                                className="btn btn-primary waves-effect waves-light mt-4 m-3"
                                type="submit"
                              >
                                Save Changes
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-center text-white">
                <div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
