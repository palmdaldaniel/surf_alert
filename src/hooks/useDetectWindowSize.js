import { useEffect, useState } from "react";

const useDetectWindowSize = (windowSize = 600) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < windowSize) {
      setIsMobile(true);
    }

    window.addEventListener("resize", reportWindowSize);

    return () => window.addEventListener("resize", reportWindowSize);
  }, []);

  const reportWindowSize = () => {
    if (window.innerWidth < windowSize) {
      setIsMobile(true);
      return;
    }

    setIsMobile(false);
  };

  return isMobile;
};

export default useDetectWindowSize;
