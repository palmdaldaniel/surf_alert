import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const SkeletonPage = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="100%"
        height={60}
        sx={{ marginBottom: "10px" }}
      />
      <Container maxWidth="md">
        <Skeleton
          animation="wave"
          sx={{ marginBottom: "10px" }}
          variant="rectangular"
          width="100%"
          height={200}
        />

        <Box sx={{ display: "flex",  marginBottom: "5px" }}>
          <Skeleton
            animation="wave"
   
            variant="rectangular"
            width="50%"
            height={200}
          />
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "end",
            }}
          >
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="80%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="80%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="80%"
              height={30}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Skeleton
            animation="wave"
            sx={{ marginBottom: "10px" }}
            variant="rectangular"
            width="50%"
            height={200}
          />
          <Box
            sx={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="80%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="80%"
              height={30}
            />
            <Skeleton
              animation="wave"
              sx={{ marginBottom: "10px" }}
              variant="rectangular"
              width="80%"
              height={30}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SkeletonPage;
