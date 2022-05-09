import React from "react";
import { Link } from "react-router-dom";

// mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import UserAvatar from "./UserAvatar";
import SkeletonBox from "../Utils/SkeletonBox";

import useDoc from "../../hooks/useDoc";

const UserInfo = ({ user }) => {
  const img = useDoc(null, user.uid);

  console.log(img?.docs);

  return (
    <>
      {img?.docs === undefined ? (
        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SkeletonBox height={230} width={400} />
        </Box>
      ) : (
        <Card sx={{ maxWidth: 400, m: "10px auto" }}>
          <CardContent>
            {img && img?.docs.length > 0 ? (
              <UserAvatar docs={img.docs} />
            ) : (
              <Avatar
                alt="Panda"
                src="https://images.unsplash.com/photo-1622892735236-a3c8f017d45e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                sx={{ width: 56, height: 56, m: "10px auto" }}
              />
            )}

            <Typography align="center" variant="h5">
              {user.displayName ? user.displayName : user?.email}
            </Typography>
          </CardContent>
          <CardActions>
            <Button to="/update-profile" as={Link} size="small">
              Edit me
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default UserInfo;
