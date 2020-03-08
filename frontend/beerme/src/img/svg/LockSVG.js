import React from "react";

const LockSVG = ({
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 32 32",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    style={style}
    className={className}
    fill={fill}
    viewBox={viewBox}
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-lock"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default LockSVG;
