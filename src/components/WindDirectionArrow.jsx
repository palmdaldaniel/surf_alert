import React from "react";

const WindDirectionArrow = ({ degree }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px",
        height: "10px",
        width: "10px",
        transform: `rotate(${180 + degree}deg)`,
      }}
    >
      <span>&#5169;</span>
    </div>
  );
};

export default WindDirectionArrow;
