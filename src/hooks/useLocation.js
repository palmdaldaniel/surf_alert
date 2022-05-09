import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [feedBack, setFeedBack] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // clear feedback
    if (feedBack) {
      setTimeout(() => setFeedBack(), 3000);
    }
  }, [feedBack]);

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

  const createLocation = async (locationValues = null, isOnboarding) => {
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

      if (!isOnboarding) {
        navigate("/profile");
      }
    } catch (error) {
      console.log("error", error.message);
      setFeedBack({
        type: "warning",
        msg: "Location could not be saved",
      });
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
      setFeedBack({
        type: "success",
        msg: "Location updated successfully",
      });
    } catch (error) {
      console.log("error", error);
      setFeedBack({
        type: "warning",
        msg: "Could not update location",
      });
    }
  };

  return { locationQuery, createLocation, updateLocation, feedBack };
};

export default useLocation;
