import { db } from "../firebase";

import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { query, collection, where } from "firebase/firestore";

const useDoc = (locationId, userId, noProfile) => {
  if (noProfile) return;

  const q = locationId
    ? query(collection(db, "images"), where("locationId", "==", locationId))
    : query(collection(db, "images"), where("profileImageId", "==", userId));

  const imgQuery = useFirestoreQuery(["images", locationId ?? userId], q, {
    subscribe: true,
    refetchOnMount: "always",
  });

  const snapshot = imgQuery.data;

  return snapshot;
};

export default useDoc;
