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
        <IconWrapper iconName="chevron-up">
          <span>N</span>
        </IconWrapper>
      );
    case deg > 90 && deg < 160:
      return (
        <IconWrapper rotation={270} iconName="chevron-up">
          <span>E</span>
        </IconWrapper>
      );
    case deg >= 160 && deg < 200:
      return (
        <IconWrapper rotation={180} iconName="chevron-up">
          <span>S</span>
        </IconWrapper>
      );
    case deg >= 200 && deg < 300:
      return (
        <IconWrapper rotation={90} iconName="chevron-up">
          <span>W</span>
        </IconWrapper>
      );
    case deg >= 300:
      return (
        <IconWrapper iconName="chevron-up">
          <span>N</span>
        </IconWrapper>
      );
    default:
      return false;
  }
};

export { getWindDirection };
