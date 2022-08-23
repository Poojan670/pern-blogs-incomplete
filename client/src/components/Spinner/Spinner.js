import React from "react";
import spinner from "../../assets/spinner.gif";

const Spinner = ({ color, title }) => {
    return (
        <div className="container text-center">
            <img
                src={spinner}
                alt="spinner"
                color={color}
                height={title === "Login" ? "30px" : "100px"}
                className="ml-4"
            />
            {title !== "Login" && (
                <h4 className="mb-4">Please wait until the end of process.</h4>
            )}
        </div>
    );
};

export default Spinner;
