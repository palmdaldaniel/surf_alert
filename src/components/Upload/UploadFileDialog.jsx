import React from "react";
import DropZone from "../DropZone";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

const UploadFileDialog = ({
  isOpen,
  text,
  handleClose,
  locationId,
  fileUploader,
}) => {
  return (
    <Dialog
      sx={{
        minWidth: "416px",
      }}
      open={isOpen}
      onClose={handleClose}
    >
      {fileUploader.message && (
        <Alert severety={fileUploader.message.type}>
          {fileUploader.message.msg}
        </Alert>
      )}
      <DialogTitle>Upload {text} pls! </DialogTitle>
      <DialogContent>
        <DropZone fileUploader={fileUploader} locationId={locationId} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;
