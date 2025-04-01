"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Thermometer, Drop, Wind } from "@phosphor-icons/react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const WeatherTrends = ({ data }) => {
  const [activeTab, setActiveTab] = useState("temperature");

  if (!data) return null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#333",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#333",
        },
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains("dark")
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#333",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const temperatureData = {
    labels: data.labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.temperature,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: "Feels Like (°C)",
        data: data.feelsLike,
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const humidityData = {
    labels: data.labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: data.humidity,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const windData = {
    labels: data.labels,
    datasets: [
      {
        label: "Wind Speed (km/h)",
        data: data.windSpeed,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
      {
        label: "Wind Gusts (km/h)",
        data: data.windGust,
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const renderChart = () => {
    switch (activeTab) {
      case "temperature":
        return (
          <Chart type="line" data={temperatureData} options={chartOptions} />
        );
      case "humidity":
        return <Chart type="line" data={humidityData} options={chartOptions} />;
      case "wind":
        return <Chart type="line" data={windData} options={chartOptions} />;
      default:
        return (
          <Chart type="line" data={temperatureData} options={chartOptions} />
        );
    }
  };

  return (
    <Card className="shadow-lg dark:bg-gray-800">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4">
          <div>
            <Typography
              variant="h5"
              className="text-gray-800 dark:text-white font-bold"
            >
              Weather Trends
            </Typography>
            <Typography
              color="gray"
              className="mt-1 text-gray-600 dark:text-gray-400"
            >
              {data.period}
            </Typography>
          </div>
          <div className="w-full md:w-auto">
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
              <TabsHeader>
                <Tab value="temperature" className="flex items-center gap-2">
                  <Thermometer size={18} />
                  Temperature
                </Tab>
                <Tab value="humidity" className="flex items-center gap-2">
                  <Drop size={18} />
                  Humidity
                </Tab>
                <Tab value="wind" className="flex items-center gap-2">
                  <Wind size={18} />
                  Wind
                </Tab>
              </TabsHeader>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div className="h-80">{renderChart()}</div>
      </CardBody>
    </Card>
  );
};

export default WeatherTrends;
