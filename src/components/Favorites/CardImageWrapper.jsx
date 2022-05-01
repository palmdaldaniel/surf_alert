import React from "react";
import CardMedia from "@mui/material/CardMedia";

const CardImageWrapper = ({ data, finishedLoading }) => {
  const src = data[0]?.data();

  return src ? (
    <CardMedia
      sx={{
        width: "100%",
        height: "200px",
      }}
      component="img"
      alt="Surf Location"
      image={src.url}
      onLoad={() => finishedLoading(src)}
    />
  ) : (
    <CardMedia
      sx={{
        width: "100%",
        height: "200px",
      }}
      component="img"
      alt="Placeholder"
      image={"http://placehold.jp/300x170.png"}
    />
  );
};

export default CardImageWrapper;
