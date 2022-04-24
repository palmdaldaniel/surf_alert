import React, { useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import UploadFileDialog from "../Upload/UploadFileDialog.jsx";
import useDialog from "../../hooks/useDialog.js";
import useUploadFile from "../../hooks/useUploadFile.js";

import { useQueryClient } from "react-query";

const PlaceHolderImage = ({ locationId }) => {
  const queryClient = useQueryClient();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const fileUploader = useUploadFile();

  useEffect(() => {
    if (fileUploader.progress) {
      setTimeout(() => {
        closeDialog();
        queryClient.invalidateQueries("images");
      }, 3000);
    }
  }, [fileUploader.progress]);

  return (
    <>
      <div
        onClick={locationId && openDialog}
        className={locationId ? "placeholder-wrapper" : ""}
        style={{
          maxWidth: "500px",
        }}
      >
        <CardMedia
          sx={{
            width: "100%",
          }}
          component="img"
          alt="wave in the ocean"
          image={
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
        />
        {locationId && <FileUploadIcon fontSize="large" />}
      </div>
      <UploadFileDialog
        fileUploader={fileUploader}
        isOpen={isOpen}
        text="image"
        locationId={locationId}
        handleClose={closeDialog}
      />
    </>
  );
};

export default PlaceHolderImage;
