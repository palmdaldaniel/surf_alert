import React from "react";
import { Link } from "react-router-dom";

// mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import useDoc from "../hooks/useDoc";

const UserInfo = ({ user }) => {
  const img = useDoc(null, user.uid);

  return (
    <>
      <Card sx={{ width: 275, m: "10px auto" }}>
        <CardContent>
          {img && img?.docs.length > 0 ? (
            img.docs.map((item, i) => {
              const src = item.data();
              return (
                <Avatar
                  key={i}
                  alt="profile image"
                  src={src.url}
                  sx={{ width: 100, height: 100, m: "10px auto" }}
                />
              );
            })
          ) : (
            <Avatar
              alt="Remy Sharp"
              src="https://images.unsplash.com/photo-1622892735236-a3c8f017d45e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              sx={{ width: 56, height: 56, m: "10px auto" }}
            />
          )}

          <Typography align="center" variant="h5" component="div">
            {user.displayName ? user.displayName : user?.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button to="/update-profile" as={Link} size="small">
            Edit me
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserInfo;
