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
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CloudRain } from "@phosphor-icons/react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PrecipitationChart = ({ data }) => {
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
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Precipitation (mm)",
        data: data.values,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
      {
        label: "Probability (%)",
        data: data.probability,
        backgroundColor: "rgba(153, 102, 255, 0.7)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
        type: "line",
        yAxisID: "y1",
      },
    ],
  };

  return (
    <Card className="shadow-lg dark:bg-gray-800">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0"
      >
        <div className="px-4">
          <div className="flex items-center gap-2">
            <CloudRain size={24} className="text-blue-500" />
            <Typography
              variant="h5"
              className="text-gray-800 dark:text-white font-bold"
            >
              Precipitation
            </Typography>
          </div>
          <Typography
            color="gray"
            className="mt-1 text-gray-600 dark:text-gray-400"
          >
            {data.period}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div className="h-[200px]">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
      </CardBody>
    </Card>
  );
};

export default PrecipitationChart;
