import React from "react";
import CardMedia from "@mui/material/CardMedia";

const SpotImage = ({ docs }) => {
  const src = docs[0].data().url;

  return (
    <CardMedia
      sx={{
        maxWidth: "500px",
      }}
      component="img"
      alt="green iguana"
      image={src}
    />
  );
};

export default SpotImage;
