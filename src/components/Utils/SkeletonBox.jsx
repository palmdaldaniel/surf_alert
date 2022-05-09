import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonBox = ({ height, width, animation }) => {
  return (
    <Skeleton
      animation={animation ?? "wave"}
      variant="rectangular"
      width={width ?? "100%"}
      height={height}
    />
  );
};

export default SkeletonBox;
