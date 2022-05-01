import Avatar from "@mui/material/Avatar";

import React from "react";

const UserAvatar = ({ docs }) => {
  const src = docs[0].data().url;
  return (
    <Avatar
      alt="profile image"
      src={src}
      sx={{ width: 100, height: 100, m: "10px auto" }}
    />
  );
};

export default UserAvatar;
