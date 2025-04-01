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
} from "chart.js";
import { ClockCounterClockwise } from "@phosphor-icons/react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalComparison = ({ data }) => {
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

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Current Year",
        data: data.currentYear,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: "Previous Year",
        data: data.previousYear,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
      {
        label: "Historical Average",
        data: data.average,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderDash: [5, 5],
        tension: 0.4,
      },
    ],
  };

  return (
    <Card className="shadow-lg h-full dark:bg-gray-800">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0"
      >
        <div className="px-4">
          <div className="flex items-center gap-2">
            <ClockCounterClockwise size={24} className="text-purple-500" />
            <Typography
              variant="h5"
              className="text-gray-800 dark:text-white font-bold"
            >
              Historical Comparison
            </Typography>
          </div>
          <Typography
            color="gray"
            className="mt-1 text-gray-600 dark:text-gray-400"
          >
            Temperature trends over time
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div className="h-[300px]">
          <Chart type="line" data={chartData} options={chartOptions} />
        </div>
      </CardBody>
    </Card>
  );
};

export default HistoricalComparison;
