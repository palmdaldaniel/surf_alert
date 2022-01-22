import { createContext, useContext, useState, useEffect } from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase";
import Typography  from "@mui/material/Typography";
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

  const values = {
    user,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      
       {isLoading && <SkeletonPage />}
       {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
