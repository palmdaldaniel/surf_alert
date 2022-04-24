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

    const { coords, locationName, windDirection, windSpeed, locationId } =
      locationValues;

    try {
      await addDoc(savedLocationsColRef, {
        locationId,
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
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const updateLocation = async (locationValues = null, docId) => {
    if (!locationValues) return;

    const { locationName, windDirection, windSpeed } = locationValues;

    try {
      const locationRef = doc(db, "savedLocations", docId);

      await updateDoc(locationRef, {
        locationName,
        edited: serverTimestamp(),
        prefferedWindDirection: windDirection,
        prefferedWindSpeed: windSpeed,
      });

      console.log("updating values");
    } catch (error) {
      console.log("error", error);
    }
  };

  return { locationQuery, createLocation, updateLocation };
};

export default useLocation;
