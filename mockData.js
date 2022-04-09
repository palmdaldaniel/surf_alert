const kåseberga = {
  coord: {
    lon: 14.0657,
    lat: 55.3871,
  },
  weather: [
    {
      id: 500,
      main: "Rain",
      description: "light rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 276.41,
    feels_like: 269.91,
    temp_min: 276.11,
    temp_max: 277.17,
    pressure: 1006,
    humidity: 82,
    sea_level: 1006,
    grnd_level: 1005,
  },
  visibility: 10000,
  wind: {
    speed: 11.97,
    deg: 255,
    gust: 15.71,
  },
  rain: {
    "1h": 0.49,
  },
  clouds: {
    all: 90,
  },
  dt: 1645775094,
  sys: {
    type: 2,
    id: 2004780,
    country: "SE",
    sunrise: 1645769085,
    sunset: 1645806556,
  },
  timezone: 3600,
  id: 2699786,
  name: "Köpingebro",
  cod: 200,
};

const Mölle = {
  coord: {
    lon: 12.4983,
    lat: 56.2827,
  },
  weather: [
    {
      id: 500,
      main: "Rain",
      description: "light rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 276.11,
    feels_like: 270.65,
    temp_min: 275.69,
    temp_max: 276.53,
    pressure: 1003,
    humidity: 79,
  },
  visibility: 10000,
  wind: {
    speed: 8.05,
    deg: 188,
    gust: 10.28,
  },
  rain: {
    "1h": 0.11,
  },
  clouds: {
    all: 73,
  },
  dt: 1645775483,
  sys: {
    type: 2,
    id: 2004212,
    country: "SE",
    sunrise: 1645769564,
    sunset: 1645806829,
  },
  timezone: 3600,
  id: 2706003,
  name: "Höganäs",
  cod: 200,
};

const Torö = {
  coord: {
    lon: 17.8414,
    lat: 58.8246,
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 273.69,
    feels_like: 267.22,
    temp_min: 273.18,
    temp_max: 274.01,
    pressure: 995,
    humidity: 82,
    sea_level: 995,
    grnd_level: 991,
  },
  visibility: 10000,
  wind: {
    speed: 8.84,
    deg: 269,
    gust: 14.66,
  },
  clouds: {
    all: 100,
  },
  dt: 1645775546,
  sys: {
    type: 2,
    id: 2029414,
    country: "SE",
    sunrise: 1645768607,
    sunset: 1645805222,
  },
  timezone: 3600,
  id: 2687636,
  name: "Nynäshamn",
  cod: 200,
};

const Varberg = {
  coord: {
    lon: 12.2503,
    lat: 57.1057,
  },
  weather: [
    {
      id: 803,
      main: "Clouds",
      description: "broken clouds",
      icon: "04d",
    },
  ],
  base: "stations",
  main: {
    temp: 276.34,
    feels_like: 270.6,
    temp_min: 275.03,
    temp_max: 277.22,
    pressure: 1001,
    humidity: 93,
    sea_level: 1001,
    grnd_level: 999,
  },
  visibility: 10000,
  wind: {
    speed: 9.12,
    deg: 235,
    gust: 12.4,
  },
  clouds: {
    all: 59,
  },
  dt: 1645775948,
  sys: {
    type: 2,
    id: 2008016,
    country: "SE",
    sunrise: 1645769723,
    sunset: 1645806789,
  },
  timezone: 3600,
  id: 2664996,
  name: "Varberg",
  cod: 200,
};

const locations = [
  {
    name: "kåseberga",
    lon: 14.0657,
    lat: 55.3871,
  },
  {
    name: "mölle",
    lon: 12.4983,
    lat: 56.2827,
  },
  {
    name: "torö",
    lon: 17.8414,
    lat: 58.8246,
  },
  {
    name: "torö",
    lon: 17.8414,
    lat: 58.8246,
  },
  {
    name: "varberg",
    lon: 12.2503,
    lat: 57.1057,
  },
];

// station kungsholms fort -- ligger uppe vid karslkrona.
const destination = {
  name: "malmö",
  lat: 55.60587,
  lon: 13.00073,
};

// kåseberga
const lat = 55.3871;
const lon = 14.0657;

const stations = [
  {
    name: "LANDSORT NORRA",
    lat: 58.7689,
    lon: 17.8589,
  },
  {
    name: "onsala",
    lat: 57.392,
    lon: 11.919,
  },
  {
    name: "kungsholms fort",
    lat: 56.1053,
    lon: 15.5894,
  },
];

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist = dist * 1.609344;
    }
    if (unit == "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

let distances = [];

const result = stations
  .map((item) => {
    return {
      name: item.name,
      distance: distance(
        destination.lat,
        destination.lon,
        item.lat,
        item.lon,
        "K"
      ),
    };
  })
  .reduce((prev, curr) => {
    return prev.distance < curr.distance ? prev : curr;
  });

const windData = [
  {
    dt: 1648807200,
    wind_speed: 3.46,
    wind_deg: 76,
  },
  {
    dt: 1648893600,
    wind_speed: 3.45,
    wind_deg: 280,
  },
];

const getDirection = (deg) => {
  switch (true) {
    case deg <= 90 || deg >= 300:
      return "N";
    case deg > 90 && deg < 160:
      return "E";
    case deg >= 160 && deg < 200:
      return "S";
    case deg >= 200 && deg < 300:
      return "W";
    case deg >= 300:
      return "N";
    default:
      return false;
  }
};

const savedLocations = [
  {
    locationId: "b39c696f-93bb-443a-bb34-9a01e193e248",
    coordinates: {
      lon: 1231.321,
      lat: 123.1231,
    },
    locationName: "Kåseberga",
    created: "March 7, 2022 at 11:31:30 AM UTC+1",
    edited: "March 7, 2022 at 11:31:30 AM UTC+1",
    owner: "hOagfNgWwYSFn1Vau4BB949ZXOv2",
    prefferedWindDirection: 4322,
    prefferedWindSpeed: 1231,
  },
];

const images = [
  {
    locationId: "665a13a8-4d94-4a65-babc-16d0542fba64",
    ext: "png",
    name: "Screenshot 2022-01-11 at 10.33.05.png",
    owner: "hOagfNgWwYSFn1Vau4BB949ZXOv2",
    path: "images/76c6240b-10b8-4bee-8dd0-34c3b22387f9.png",
    size: 180829,
    type: "image/png",
    url: "https://firebasestorage.googleapis.com/v0/b/photo-review-aad07.appspot.com/o/images%2F76c6240b-10b8-4bee-8dd0-34c3b22387f9.png?alt=media&token=296cd2a4-59ea-4d43-9043-f96c83a08b8b",
    uuid: "76c6240b-10b8-4bee-8dd0-34c3b22387f9",
  },
];
