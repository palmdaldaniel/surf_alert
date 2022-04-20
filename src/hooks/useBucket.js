import { ref, deleteObject } from "firebase/storage";
import { storage } from "../firebase";

const useBucket = () => {
  const deleteFromBucket = async (path) => {
    const imageRef = ref(storage, path);
    try {
      await deleteObject(imageRef);
      console.log("profit, image deleted with path ::>", path);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return { deleteFromBucket };
};

export default useBucket;
