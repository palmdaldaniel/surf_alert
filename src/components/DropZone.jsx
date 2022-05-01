import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../utils/DropZoneStyles";

import Box from "@mui/system/Box";

import CustomProgress from "./CustomProgress";

const DropZone = ({ locationId, fileUploader }) => {
  const onDrop = useCallback((acceptedFiles) => {
    // get the first one in the array

    fileUploader.upload(acceptedFiles[0], locationId);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: ["image/*", "png"] });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <>
      {fileUploader.progress === 0 ? (
        <div {...getRootProps({ style })} className="my-3">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop some file here, or click to select files</p>
          )}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomProgress value={fileUploader.progress} />
        </Box>
      )}
    </>
  );
};

export default DropZone;
