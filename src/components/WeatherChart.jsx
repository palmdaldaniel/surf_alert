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
import { Box } from "@mui/material";

const WeatherChart = ({ forecastData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const parsedForecastData = parseForecast(forecastData);

    setChartData(parsedForecastData);
  }, []);

  return (
    <Box
      sx={{
        height: "300px",
        width: { xs: "300", sm: "500px" },
        margin: "10px 0",
      }}
    >
      {chartData && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis domain={[0, 30]} />

            <Legend />
            <Bar dataKey="windSpeed" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default WeatherChart;
