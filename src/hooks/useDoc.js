import react, { useState } from "react";

import { db } from "../firebase";

import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { query, collection, where } from "firebase/firestore";

const useDoc = (locationId) => {
  if (!locationId) return;

  const q = query(
    collection(db, "images"),
    where("locationId", "==", locationId)
  );

  const imgQuery = useFirestoreQuery(["images", locationId], q, {
    subscribe: true,
  });

  const snapshot = imgQuery.data;

  return snapshot;
};

export default useDoc;
