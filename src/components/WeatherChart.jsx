import React, { useEffect, useState } from "react";
import { parseForecast } from "../helpers";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Day 1",
    pv: 5,
  },
  {
    name: "Day 2",
    pv: 5.9,
  },
  {
    name: "Day 3",
    pv: 5,
  },
  {
    name: "Day 4",
    pv: 3,
  },
  {
    name: "Day 5",
    pv: 20,
  },
  {
    name: "Day 6",
    pv: 15,
  },
  {
    name: "Day 7",
    pv: 20,
  },
];

const WeatherChart = ({ forecastData }) => {
  const [chartData, setChartData] = useState(null);

  console.log(chartData);
  useEffect(() => {
    const parsedForecastData = parseForecast(forecastData);

    setChartData(parsedForecastData);
  }, []);

  return (
    <div
      style={{
        height: "300px",
        width: "550px",
        margin: "10px auto",
      }}
    >
      {chartData && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 30]} />

            <Legend />
            <Bar dataKey="windSpeed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default WeatherChart;
