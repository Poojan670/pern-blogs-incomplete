import React from "react";

const date = new Date().getFullYear();

const Footer = () => {
    return (
        <div>
            <p style={{ color: "white" }}>
                ©{date} PERN-blogs  @Poojan Pradhan.
            </p>
        </div>
    );
};

export default Footer;
