const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
import IconWrapper from "../components/IconWrapper";

const getWindDirection = (degree = null) => {
  if (degree === null) return false;

  return getCompass(degree);
};

const getCompass = (deg) => {
  switch (true) {
    case deg >= 300 || deg <= 90:
      return (
        <IconWrapper iconName="arrow-up">
          <span>N</span>
        </IconWrapper>
      );
    case deg > 90 && deg < 160:
      return (
        <IconWrapper rotation={270} iconName="arrow-up">
          <span>E</span>
        </IconWrapper>
      );
    case deg >= 160 && deg < 200:
      return (
        <IconWrapper rotation={180} iconName="arrow-up">
          <span>S</span>
        </IconWrapper>
      );
    case deg >= 200 && deg < 300:
      return (
        <IconWrapper rotation={90} iconName="arrow-up">
          <span>W</span>
        </IconWrapper>
      );
    default:
      return false;
  }
};

const getCompass2 = (deg) => {
  switch (true) {
    case deg < 90 || deg > 300:
      return "N";
    case deg > 90 && deg < 160:
      return "E";
    case deg >= 160 && deg < 200:
      return "S";
    case deg >= 200 && deg <= 300:
      return "W";
    default:
      return false;
  }
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
  getCompass,
  getCompass2,
  checkDirection,
  checkWindSpeed,
};
