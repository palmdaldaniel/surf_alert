import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonBox = ({ height, width, animation, mt }) => {
  return (
    <Skeleton
      animation={animation ?? "wave"}
      variant="rectangular"
      width={width ?? "100%"}
      height={height}
      sx={{
        marginTop: mt ?? 0,
      }}
    />
  );
};

export default SkeletonBox;
