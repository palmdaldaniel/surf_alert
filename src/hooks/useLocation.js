import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";

const useLocation = (locationId = null) => {
  const { user } = useAuthContext();

  const savedLocationsColRef = collection(db, "savedLocations");

  const queryKey = !locationId
    ? ["savedLocations", user.uid]
    : ["savedLocation", locationId];

  const queryRef = !locationId
    ? query(savedLocationsColRef, where("owner", "==", user.uid))
    : query(savedLocationsColRef, where("locationId", "==", locationId));

  // request with data.
  const locationQuery = useFirestoreQueryData(
    queryKey,
    queryRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  const createLocation = async (locationValues = null) => {
    if (!locationValues) return;

    const {
      coords,
      locationName,
      windDirection,
      windSpeed,
      locationId: uuid,
    } = locationValues;

    try {
      await addDoc(savedLocationsColRef, {
        locationId: uuid,
        coordinates: {
          lng: coords.lng,
          lat: coords.lat,
        },
        locationName,
        created: serverTimestamp(),
        edited: serverTimestamp(),
        owner: user.uid,
        prefferedWindDirection: windDirection,
        prefferedWindSpeed: windSpeed,
      });

      // when all is good and well
      console.log("doc created, good job 🔥");
      // navigate(`/albums/${uuid}`);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return { locationQuery, createLocation };
};

export default useLocation;
