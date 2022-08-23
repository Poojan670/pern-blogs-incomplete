import React from "react";
import Spinner from "../Spinner/Spinner";
import Tooltip from "../ToolTip/Tooltip";

const Button = ({
    type,
    className,
    disabled,
    title,
    loading,
    content,
    color,
    onClick,
}) => {
    return (
        <Tooltip content={content}>
            <button
                onClick={onClick}
                type={type}
                className={className}
                disabled={disabled}
            >
                {loading ? <Spinner color={color} title={title} /> : title}
            </button>
        </Tooltip>
    );
};
export default Button;
