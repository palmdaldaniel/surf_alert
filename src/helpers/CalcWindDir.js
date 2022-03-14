const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const getWindDirection = (degree = null) => {
  if (degree === null) return false;

  const compass = getCompass(degree);

  return compass;
};

const getCompass = (deg) => {
  switch (true) {
    case deg <= 90:
      return "N";
    case deg > 90 && deg < 160:
      return "E";
    case deg >= 160 && deg < 200:
      return "S";
    case deg >= 200 && deg < 270:
      return "SW";
    default:
      return false;
  }
};

export { getWindDirection };
