import React from "react";
import CardMedia from "@mui/material/CardMedia";

const SpotImage = ({ docs }) => {
  const src = docs[0].data().url;

  return (
    <CardMedia
      sx={{
        margin: "10px 0",
        width: "100%",
        maxHeight: "300px",
      }}
      component="img"
      alt="green iguana"
      image={src}
    />
  );
};

export default SpotImage;
