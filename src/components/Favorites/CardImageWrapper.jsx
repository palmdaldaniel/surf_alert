import React from "react";
import CardMedia from "@mui/material/CardMedia";

const CardImageWrapper = ({ data, finishedLoading }) => {
  const src = data[0]?.data();

  return src ? (
    <CardMedia
      sx={{
        width: "100%",
      }}
      component="img"
      alt="green iguana"
      image={src.url}
      onLoad={() => finishedLoading(src)}
    />
  ) : (
    <CardMedia
      sx={{
        width: "100%",
      }}
      component="img"
      alt="green iguana"
      image={"http://placehold.jp/300x170.png"}
    />
  );
};

export default CardImageWrapper;
