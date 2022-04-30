import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import useForm from "../hooks/useForm";
import Alert from "@mui/material/Alert";
import DropZone from "../components/DropZone";
import useDoc from "../hooks/useDoc";
import Avatar from "@mui/material/Avatar";
import useUploadFiles from "../hooks/useUploadFile";

const UpdateProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [feedBack, setFeedBack] = useState(null);
  const { user, setEmail, setPassword, setDisplayName } = useAuthContext();

  const img = useDoc(null, user.uid);
  const fileUploader = useUploadFiles();

  const [values, handleChange] = useForm(
    {
      username: user.displayName ? user.displayName : "",
      email: user.email ? user.email : "",
      password: "",
      confirmPassword: "",
    },
    false
  );

  // update user profile  => put into a hook.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // make sure user has entered the same password in both input fields
    if (values.password !== values.confirmPassword) {
      return setFeedBack({
        type: "warning",
        msg: "The passwords does not match",
      });
    }

    setFeedBack(null);

    try {
      // disable update-button while updating is in progress
      setLoading(true);

      // update displayName *ONLY* if it has changed
      if (values.username !== user.displayName) {
        console.log("changing displayname");
        await setDisplayName(values.username);
      }

      // update email *ONLY* if it has changed
      if (values.email !== user.email) {
        console.log("changing email");
        await setEmail(values.email);
      }

      // update password *ONLY* if the user has provided a new password to set
      if (values.password) {
        console.log("changing password");
        await setPassword(values.password);
      }

      setFeedBack({
        type: "success",
        msg: "Profile successfully updated",
      });
      setLoading(false);
    } catch (e) {
      setFeedBack({
        type: "warning",
        msg: "Error updating profile. Try logging out and in again.",
      });
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: "30px auto",
      }}
    >
      <Button to="/profile" variant="outlined" as={Link}>
        Go back
      </Button>
      <Typography
        align="center"
        sx={{
          margin: "10px",
        }}
        variant="h4"
      >
        Update Your Profile
      </Typography>

      {/* Error and succesmessages pls */}
      {feedBack && (
        <Alert sx={{ margin: "10px" }} severity={feedBack.type}>
          {feedBack.msg}
        </Alert>
      )}
      <Box
        sx={{
          margin: "10px",
        }}
      >
        {/* Update a profileimage if you like */}
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
          <DropZone fileUploader={fileUploader} />
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            onChange={handleChange}
            value={values.username}
            sx={{ margin: "10px" }}
            id="filled-basic"
            name="username"
            label="Username"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={values.email}
            sx={{ margin: "10px" }}
            id="filled-basic"
            name="email"
            label="Email"
            variant="outlined"
          />

          <TextField
            onChange={handleChange}
            value={values.password}
            sx={{ margin: "10px" }}
            id="filled-basic"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
          />
          <TextField
            onChange={handleChange}
            value={values.confirmPassword}
            sx={{ margin: "10px" }}
            id="filled-basic"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
          />
          <Box>
            <Button
              variant="contained"
              disabled={loading}
              type="submit"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default UpdateProfilePage;
