import React from "react";
import CardMedia from "@mui/material/CardMedia";
import SkeletonBox from "../Utils/SkeletonBox";

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
    <SkeletonBox animation={false} height={200} />
  );
};

export default CardImageWrapper;
