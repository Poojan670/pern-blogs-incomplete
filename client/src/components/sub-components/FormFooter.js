import React from "react";

const date = new Date().getFullYear();

const Footer = () => {
    return (
        <div>
            <p className="text-sm font-light text-gray-800 text-center">
                ©{date} PERN-blogs  @Poojan Pradhan.
            </p>
        </div>
    );
};

export default Footer;
