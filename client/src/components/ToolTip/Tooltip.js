import React from "react";
import Tippy from "@tippyjs/react";

const Tooltip = ({ content, children }) => {
    return <Tippy content={content}>{children}</Tippy>;
};

export default Tooltip;
