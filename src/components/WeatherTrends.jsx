"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
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
import { Thermometer, Drop, Wind, Activity } from "@phosphor-icons/react";

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
  const [activeTab, setActiveTab] = useState("wind");

  if (!data) return null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#1a202c",
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: "600",
            family: "Inter",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1a202c",
        bodyColor: "#4a5568",
        borderColor: "rgba(71, 85, 105, 0.3)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        titleFont: {
          size: 13,
          weight: "600",
        },
        bodyFont: {
          size: 12,
          weight: "500",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 11,
            weight: "500",
            family: "Inter",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(71, 85, 105, 0.1)",
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          font: {
            size: 11,
            weight: "500",
            family: "Inter",
          },
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
    },
  };

  const temperatureData = {
    labels: data.labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.temperature,
        borderColor: "rgb(249, 115, 22)",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(249, 115, 22)",
        pointBorderColor: "#fff",
      },
      {
        label: "Feels Like (°C)",
        data: data.feelsLike,
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(239, 68, 68)",
        pointBorderColor: "#fff",
      },
    ],
  };

  const humidityData = {
    labels: data.labels,
    datasets: [
      {
        label: "Humidity (%)",
        data: data.humidity,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#fff",
      },
    ],
  };

  const windData = {
    labels: data.labels,
    datasets: [
      {
        label: "Wind Speed (km/h)",
        data: data.windSpeed,
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(139, 92, 246)",
        pointBorderColor: "#fff",
      },
      {
        label: "Wind Gusts (km/h)",
        data: data.windGust,
        borderColor: "rgb(168, 85, 247)",
        backgroundColor: "rgba(168, 85, 247, 0.1)",
        fill: false,
        tension: 0.4,
        borderDash: [5, 5],
        pointBackgroundColor: "rgb(168, 85, 247)",
        pointBorderColor: "#fff",
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

  const tabData = [
    {
      value: "temperature",
      icon: Thermometer,
      label: "Temperature",
      color: "text-orange-500",
      gradient: "from-orange-400 to-red-500",
    },
    {
      value: "humidity",
      icon: Drop,
      label: "Humidity",
      color: "text-blue-500",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      value: "wind",
      icon: Wind,
      label: "Wind",
      color: "text-purple-500",
      gradient: "from-purple-400 to-indigo-500",
    },
  ];

  return (
    <Card className="chart-container border-0 shadow-lg overflow-hidden">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0 bg-transparent"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
              <Activity size={20} weight="fill" />
            </div>
            <div>
              <Typography variant="h5" className="text-gradient font-bold">
                Weather Trends
              </Typography>
              <Typography
                variant="small"
                className="text-readable-light font-medium"
              >
                {data.period}
              </Typography>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <div className="bg-gray-100/80 p-1 rounded-xl flex gap-1">
              {tabData.map(({ value, icon: Icon, label, color, gradient }) => (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`relative flex items-center justify-center gap-2 flex-1 sm:flex-initial px-4 py-2 rounded-lg transition-all duration-300 font-semibold ${
                    activeTab === value
                      ? `bg-gradient-to-r ${gradient} text-white shadow-lg transform scale-105`
                      : `bg-transparent text-gray-600 hover:text-gray-800 hover:bg-white/50`
                  }`}
                >
                  <Icon
                    size={16}
                    weight="fill"
                    className={activeTab === value ? "text-white" : color}
                  />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-4 pb-4">
        <div className="h-64 relative rounded-lg overflow-hidden">
          {renderChart()}
        </div>
      </CardBody>
    </Card>
  );
};

export default WeatherTrends;
