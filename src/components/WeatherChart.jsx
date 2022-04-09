import React, { useEffect, useState } from "react";
import { parseForecast } from "../helpers";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Box } from "@mui/material";

const WeatherChart = ({ forecastData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const parsedForecastData = parseForecast(forecastData);

    setChartData(parsedForecastData);
  }, []);

  const CustomLabel = (props) => {
    const { x, y, width, index } = props;
    const radius = 15;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {chartData[index].windDeg}
        </text>
      </g>
    );
  };

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
            <Bar dataKey="windSpeed" fill="#8884d8">
              <LabelList content={CustomLabel} position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default WeatherChart;
