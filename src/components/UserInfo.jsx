import React from "react";

// mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const UserInfo = ({ user }) => {
  return (
    <>
      <Card sx={{ width: 275, m: "10px auto" }}>
        <CardContent>
          <Avatar
            alt="Remy Sharp"
            src="https://images.unsplash.com/photo-1622892735236-a3c8f017d45e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            sx={{ width: 56, height: 56, m: "10px auto" }}
          />
          <Typography variant="h5" component="div">
            {user?.email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Developer
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit me</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default UserInfo;
