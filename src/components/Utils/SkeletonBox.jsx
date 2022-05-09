import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonBox = ({ height, width }) => {
  return (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width={width ?? "100%"}
      height={height}
      sx={{ margin: "10px 0" }}
    />
  );
};

export default SkeletonBox;
