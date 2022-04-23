import { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase";
import SkeletonPage from "../pages/SkeletonPage";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const setEmail = (newEmail) => {
    return updateEmail(user, newEmail);
  };

  const setPassword = (newPassword) => {
    return updatePassword(user, newPassword);
  };

  const setDisplayName = (name) => {
    return updateProfile(user, {
      displayName: name,
    });
  };

  const values = {
    user,
    register,
    login,
    logout,

    setEmail,
    setPassword,
    setDisplayName,
  };

  return (
    <AuthContext.Provider value={values}>
      {isLoading && <SkeletonPage />}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
