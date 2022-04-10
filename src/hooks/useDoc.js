import { doc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const useDoc = async (locationId) => {
  const q = query(
    collection(db, "images"),
    where("locationId", "==", "b6b583da-c1e6-4e7a-b9bf-b98d10901d91")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  return;
};

export default useDoc;
