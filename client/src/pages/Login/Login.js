import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../../components/TextError/TextError";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Auth/thunk";
import { BiLock } from "react-icons/bi";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { authConstants } from "../../Redux/Auth/constants";
import Select from "react-select";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";

const Login = () => {
    // props
    const loading = useSelector((state) => state.auth.loading);
    const dispatch = useDispatch();
    const [type, setType] = useState("password");
    //initial values of form field in formik
    const [selectValue, setSelectValue] = useState("");
    const remember = localStorage.getItem("remember_me");
    const user = localStorage.getItem("user_name");
    const initialValues = {
        branch: "",
        user_name: user ? user : "",
        password: "",
        remember_me: remember === "true" ? true : false,
    };
    const message = useSelector((state) => state.auth.message);

    useEffect(() => {

        message?.status === true &&
            dispatch({ type: authConstants.RESET_SUCCESS, payload: [] });
    }, [dispatch]);
    //validation rule for the form field in formik
    const validationSchema = Yup.object().shape({
        user_name: Yup.string()
            .required("Username is required")
            .min(3, "Username must be at least 3 characters")
            .matches(
                /(?=.*^[A-Za-z_]\w).*$/,
                "Username should begin with _ or alphabet "
            ),
        password: Yup.string()
            .required("Please Enter your password")
            .min(4, "Password should be at least 4 characters"),
        remember_me: Yup.bool(),
    });
    //submit handler for formik
    const onSubmit = (values) => {
        const { remember_me, user_name, password } = values;
        localStorage.setItem("remember_me", remember_me);
        localStorage.setItem("user_name", remember_me ? user_name : "");
        dispatch(login(user_name, password));
    };
    // toggle password
    const handleClick = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType("password");
        }
    };
    return (
        <div className="login-bak">
            <div className="account-pages">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="login-position">
                            <div className="card overflow-hidden card-login">
                                <div className="bg-primary bg-soft">
                                    <div className="p-2 mt-3">
                                        <h3 className="">Welcome!</h3>
                                        <h6>Sign in to continue.</h6>
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
                                                        <div className="mb-3 ">
                                                            <label htmlFor="user_name" className="form-label">
                                                                Username{" "}
                                                                <strong className="text-danger ">*</strong>
                                                            </label>
                                                            <Field
                                                                type="text"
                                                                className="form-control textfield-login"
                                                                name="user_name"
                                                                placeholder="Enter Username"
                                                            />
                                                            <ErrorMessage
                                                                name="user_name"
                                                                component={TextError}
                                                            />
                                                        </div>
                                                        <div className="mb-3  password-field">
                                                            <label htmlFor="password" className="form-label ">
                                                                Password{" "}
                                                                <strong className="text-danger ">*</strong>
                                                            </label>
                                                            <div style={{ position: "relative" }}>
                                                                <Field
                                                                    type={type}
                                                                    className="form-control textfield-login"
                                                                    name="password"
                                                                    placeholder="Enter Password"
                                                                />
                                                                <span
                                                                    style={{ lineHeight: "10px", top: "11px" }}
                                                                    onClick={handleClick}
                                                                >
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
                                                        <div className="form-check">
                                                            <Field
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name="remember_me"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="remember_me"
                                                            >
                                                                Remember me
                                                            </label>
                                                        </div>
                                                        <div className="mt-4 mb-3 text-center">
                                                            <Button
                                                                type={"btn"}
                                                                className={
                                                                    "btn btn-primary waves-effect waves-light btn-login"
                                                                }
                                                                loading={loading}
                                                                disabled={loading}
                                                                title={"Login"}
                                                                content={"Login"}
                                                            />
                                                        </div>
                                                        <div className="text-center mt-2">
                                                            <Link
                                                                to="/reset-password"
                                                                className="text-decoration-none"
                                                            >
                                                                <i className="me-1 ">
                                                                    <BiLock />
                                                                </i>
                                                                Forgot password?
                                                            </Link>
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

export default Login;
