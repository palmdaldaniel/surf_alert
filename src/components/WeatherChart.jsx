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

const WeatherChart = ({ forecastData }) => {
  const [chartData, setChartData] = useState(null);

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
