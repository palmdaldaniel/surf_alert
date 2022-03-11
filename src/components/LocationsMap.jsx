import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/palmdaldaniel/geo-map-of-sweden/main/gadm40_SWE.json";

// coordinates order lon,lat
const markers = [
  {
    markerOffset: -20,
    name: "kåseberga",
    coordinates: [14.0657, 55.3871],
  },
  {
    markerOffset: -20,
    name: "mölle",
    coordinates: [12.4983, 56.2827],
  },
  {
    markerOffset: -20,
    name: "torö",
    coordinates: [17.8414, 58.8246],
  },
  {
    markerOffset: -20,
    name: "varberg",
    coordinates: [12.2503, 57.1057],
  },
];

const MapChart = () => {
  return (
    <div style={{}}>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-15.0, -58.0, 0],
          scale: 5000,
        }}
      >
        <Geographies
          geography={geoUrl}
          fill="#D6D6DA"
          stroke="#FFFFFF"
          strokeWidth={0.5}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={8} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontSize: "25px",
                fontFamily: "system-ui",
                fill: "#5D5A6D",
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
