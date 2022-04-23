import React from "react";
import DropZone from "../DropZone";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const UploadFileDialog = ({ isOpen, text, handleClose, locationId }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Upload {text} pls! </DialogTitle>
        <DialogContent>
          <DropZone locationId={locationId} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadFileDialog;
