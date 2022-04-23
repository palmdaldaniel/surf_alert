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
    const { x, y, index, fill } = props;

    return (
      <text
        x={x + 30}
        y={y + -5}
        dy={-15}
        fontSize="16"
        fontFamily="sans-serif"
        fill={fill}
        textAnchor="middle"
        rotate={chartData[index].windDeg + 180}
      >
        &#5169;
      </text>
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
            <Bar
              dataKey="windSpeed"
              fill="#8884d8"
              label={<CustomLabel />}
            ></Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default WeatherChart;
