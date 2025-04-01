import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Factory } from "@phosphor-icons/react";

const EnvironmentalImpact = ({ data }) => {
  if (!data) return null;

  // Function to generate a color based on carbon intensity value
  const getCarbonIntensityColor = (value) => {
    if (value < 50) return "bg-green-100 dark:bg-green-900";
    if (value < 100) return "bg-green-200 dark:bg-green-800";
    if (value < 150) return "bg-yellow-100 dark:bg-yellow-900";
    if (value < 200) return "bg-yellow-200 dark:bg-yellow-800";
    if (value < 250) return "bg-orange-100 dark:bg-orange-900";
    if (value < 300) return "bg-orange-200 dark:bg-orange-800";
    if (value < 350) return "bg-red-100 dark:bg-red-900";
    if (value < 400) return "bg-red-200 dark:bg-red-800";
    return "bg-red-300 dark:bg-red-700";
  };

  // Function to get text color based on background
  const getTextColor = (value) => {
    if (value < 200) return "text-gray-800 dark:text-white";
    return "text-white dark:text-white";
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
            <Factory size={24} className="text-green-500" />
            <Typography
              variant="h5"
              className="text-gray-800 dark:text-white font-bold"
            >
              Environmental Impact
            </Typography>
          </div>
          <Typography
            color="gray"
            className="mt-1 text-gray-600 dark:text-gray-400"
          >
            Carbon intensity heat map
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div className="grid grid-cols-7 gap-1">
          {data.days.map((day, dayIndex) => (
            <div key={`day-${dayIndex}`} className="text-center">
              <Typography
                variant="small"
                className="font-medium text-gray-700 dark:text-gray-300"
              >
                {day.day}
              </Typography>
              <div className="grid grid-rows-6 gap-1 mt-1">
                {day.hours.map((hour, hourIndex) => (
                  <div
                    key={`hour-${dayIndex}-${hourIndex}`}
                    className={`flex items-center justify-center p-1 rounded ${getCarbonIntensityColor(
                      hour.value
                    )}`}
                    title={`${day.day} ${hour.time}: ${hour.value} gCO2/kWh`}
                  >
                    <Typography
                      variant="small"
                      className={`text-xs font-medium ${getTextColor(
                        hour.value
                      )}`}
                    >
                      {hour.value}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <Typography
              variant="small"
              className="text-gray-700 dark:text-gray-300"
            >
              Low Carbon Intensity
            </Typography>
            <Typography
              variant="small"
              className="text-gray-700 dark:text-gray-300"
            >
              High Carbon Intensity
            </Typography>
          </div>
          <div className="h-2 w-full mt-1 rounded-full bg-gradient-to-r from-green-300 via-yellow-300 to-red-500"></div>
          <div className="flex justify-between mt-1">
            <Typography
              variant="small"
              className="text-gray-600 dark:text-gray-400"
            >
              0 gCO2/kWh
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 dark:text-gray-400"
            >
              500+ gCO2/kWh
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EnvironmentalImpact;
