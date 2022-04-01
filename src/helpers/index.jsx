const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
import IconWrapper from "../components/IconWrapper";

const getWindDirection = (degree = null) => {
  if (degree === null) return false;

  return getCompass(degree);
};

const getCompass = (deg) => {
  switch (true) {
    case deg <= 90:
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
    case deg >= 300:
      return (
        <IconWrapper iconName="arrow-up">
          <span>N</span>
        </IconWrapper>
      );
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
    };
  });
};

export {
  getWindDirection,
  parseTime,
  parseToUrl,
  parseToCoordinates,
  parseForecast,
};
