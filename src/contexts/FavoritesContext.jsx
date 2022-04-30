import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};

const FavoritesContextProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);

  const updateCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const values = {
    counter,
    updateCounter,
  };

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
