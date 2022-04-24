const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const getWindDirection = (degree = null) => {
  if (degree === null) return false;

  return getCompass(degree);
};

const parseTime = (timeInUnix) => {
  const time = new Date(timeInUnix * 1000);

  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const parseToUrl = ({ lat, lng }) => {
  return {
    lat: lat.toString().replace(".", "&"),
    lng: lng.toString().replace(".", "&"),
  };
};

const parseToCoordinates = ({ lat, lng }) => {
  return {
    lat: Number(lat.replace("&", ".")),
    lng: Number(lng.replace("&", ".")),
  };
};

const parseForecast = (data = null) => {
  if (!data) return;

  return data.map((item) => {
    const options = { month: "numeric", day: "numeric" };
    const date = new Date(item.dt * 1000).toLocaleDateString([], options);
    return {
      day: date,
      windSpeed: item.wind_speed,
      windDeg: item.wind_deg,
    };
  });
};

const checkDirection = (current, user) => {
  let directionIsGood;

  switch (true) {
    case current === user:
      directionIsGood = true;
      break;
    case current > user:
      if (current > user + 10) {
        directionIsGood = false;
      } else {
        directionIsGood = true;
      }
      directionIsGood;
      break;

    case current < user:
      if (current < user - 10) {
        directionIsGood = false;
      } else {
        directionIsGood = true;
      }
      break;
    default:
      directionIsGood = false;
      break;
  }

  return directionIsGood;
};

const checkWindSpeed = (current, user) => {
  let windIsGood;

  if (current >= user) {
    windIsGood = true;
  } else {
    windIsGood = false;
  }

  return windIsGood;
};

export {
  getWindDirection,
  parseTime,
  parseToUrl,
  parseToCoordinates,
  parseForecast,
  checkDirection,
  checkWindSpeed,
};
