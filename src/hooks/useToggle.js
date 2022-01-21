import { useState } from "react";

const useToggle = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return { isShowing, toggle };
};

export default useToggle;
