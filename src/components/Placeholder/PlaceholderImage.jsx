import React, { useEffect } from "react";

// mui
import FileUploadIcon from "@mui/icons-material/FileUpload";

// components
import UploadFileDialog from "../Dialog/UploadFileDialog.jsx";

// hooks
import useDialog from "../../hooks/useDialog.js";
import useUploadFile from "../../hooks/useUploadFile.js";

import { useQueryClient } from "react-query";
import SkeletonBox from "../Utils/SkeletonBox.jsx";

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
        <SkeletonBox height={300} animation={false} />

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
