import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

const DeleteDialog = ({ open, handleClose, handleDelete, id }) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete saved location</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to delete location with id: {id}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(true)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
