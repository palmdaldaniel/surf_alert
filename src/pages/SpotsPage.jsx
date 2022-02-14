import React from "react";
import useLocationWeather from "../hooks/useLocationWeather";

const SpotPage = () => {
  const weatherData = useLocationWeather();

  return <div>SpotPage</div>;
};

export default SpotPage;
