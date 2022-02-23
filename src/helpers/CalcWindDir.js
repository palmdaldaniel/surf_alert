//const direction = "0";
const compassPoints = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const getWindDirection = (degree) => {
  const d_as_num = parseInt(degree);

  switch (true) {
    case d_as_num <= 90:
      return "N";
    case d_as_num > 90 && d_as_num < 160:
      return "E";
    case d_as_num >= 160 && d_as_num < 200:
      return "S";
    case d_as_num >= 200 && d_as_num < 270:
      return "SW";
    default:
      return -1;
  }
};

const result = getWindDirection(160);

result;
