import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../../components/TextError/TextError";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Auth/thunk";
import { BiLock } from "react-icons/bi";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { authConstants } from "../../Redux/Auth/constants";
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
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                Blogs  
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="/" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        </section>
    );
};

export default Login;
