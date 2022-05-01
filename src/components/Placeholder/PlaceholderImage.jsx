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
      >
        <CardMedia
          sx={{
            width: "100%",
            margin: "10px 0",
          }}
          component="img"
          alt="placeholder image"
          image={"http://placehold.jp/700x200.png"}
        />
        {locationId && <FileUploadIcon fontSize="large" />}
      </div>
      <UploadFileDialog
        fileUploader={fileUploader}
        isOpen={true}
        text="image"
        locationId={locationId}
        handleClose={closeDialog}
      />
    </>
  );
};

export default PlaceHolderImage;
