import { useState } from "react";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";

const useUploadFiles = () => {
  const [message, setMessage] = useState(null);

  const [progress, setProgress] = useState(0);
  const { user } = useAuthContext();

  const upload = (image = null, locationId) => {
    if (!image) return;

    setProgress();

    const uuid = uuidv4();

    // find file extension
    const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

    // create a reference to upload the file to
    const fileRef = ref(storage, `images/${uuid}.${ext}`);

    console.log("file ref", fileRef);

    // upload image to fileRef
    const fileUploadTask = uploadBytesResumable(fileRef, image);

    fileUploadTask.on(
      "state_changed",
      (snapshot) => {
        const result = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(result);
      },
      (error) => {
        console.log(error);
        setMessage({
          type: "warning",
          msg: `Image failed to upload due to the following error: ${error}`,
        });
      },
      async () => {
        // get download url to uploaded file
        const url = await getDownloadURL(fileRef);

        // get reference to collection 'images'
        const collectionRef = collection(db, "images");

        const uploadDocumentModel = locationId
          ? {
              locationId,
              name: image.name,
              path: fileRef.fullPath,
              size: image.size,
              type: image.type,
              owner: user.uid,
              ext,
              url,
              uuid,
            }
          : {
              profileImageId: user.uid,
              name: image.name,
              path: fileRef.fullPath,
              size: image.size,
              type: image.type,
              owner: user.uid,
              ext,
              url,
              uuid,
            };

        // a document is created in the db
        try {
          await addDoc(collectionRef, uploadDocumentModel);
          setMessage({
            type: "success",
            msg: "Congrats your file/files are uploaded",
          });
        } catch (error) {
          console.log({ error });
        }
      }
    );
  };

  return { upload, message, progress };
};

export default useUploadFiles;
