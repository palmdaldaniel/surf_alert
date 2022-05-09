import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

const SkeletonPage = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={70}
        sx={{ marginBottom: "10px" }}
      />
      <Container className="skeleton-wrapper" maxWidth="lg">
        <Skeleton
          animation="wave"
          sx={{ marginBottom: "10px" }}
          variant="rectangular"
          width="100%"
          height={200}
        />
        <div className="skeleton-wrapper-content">
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ marginBottom: "10px", display: { xs: "none", md: "block" } }}
          />
          <div className="skeleton-wrapper-content-text">
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="100%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="100%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="100%"
              height={30}
            />
          </div>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ marginBottom: "10px" }}
          />
          <div className="skeleton-wrapper-content-text">
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="100%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="100%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="100%"
              height={30}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SkeletonPage;
