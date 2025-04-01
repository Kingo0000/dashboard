import { Card, CardBody, Typography } from "@material-tailwind/react";
import { Thermometer, Wind, Drop, Leaf } from "@phosphor-icons/react";

const MetricCard = ({ icon, title, value, unit, color, description }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow dark:bg-gray-800 mb-4">
      <CardBody className="p-4">
        <div className="flex items-center gap-4">
          <div className={`rounded-full p-3 ${color} text-white`}>{icon}</div>
          <div>
            <Typography
              variant="h6"
              className="text-gray-700 dark:text-gray-200"
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              className="font-bold text-gray-900 dark:text-white"
            >
              {value}
              <span className="text-sm ml-1">{unit}</span>
            </Typography>
            {description && (
              <Typography
                variant="small"
                className="text-gray-600 dark:text-gray-400"
              >
                {description}
              </Typography>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const KeyMetrics = ({ data }) => {
  if (!data) return null;

  const getAirQualityDescription = (aqi) => {
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Moderate";
    if (aqi <= 150) return "Unhealthy for Sensitive Groups";
    if (aqi <= 200) return "Unhealthy";
    if (aqi <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  return (
    <div>
      <Typography
        variant="h5"
        className="mb-4 text-gray-800 dark:text-white font-bold"
      >
        Current Conditions
      </Typography>

      <MetricCard
        icon={<Thermometer size={24} weight="fill" />}
        title="Temperature"
        value={data.temperature}
        unit="°C"
        color="bg-orange-500"
        description={`Feels like ${data.feelsLike}°C`}
      />

      <MetricCard
        icon={<Leaf size={24} weight="fill" />}
        title="Air Quality Index"
        value={data.airQuality}
        unit=""
        color="bg-green-500"
        description={getAirQualityDescription(data.airQuality)}
      />

      <MetricCard
        icon={<Drop size={24} weight="fill" />}
        title="Humidity"
        value={data.humidity}
        unit="%"
        color="bg-blue-500"
        description={
          data.humidity > 70 ? "High" : data.humidity < 30 ? "Low" : "Normal"
        }
      />

      <MetricCard
        icon={<Wind size={24} weight="fill" />}
        title="Wind Speed"
        value={data.windSpeed}
        unit="km/h"
        color="bg-purple-500"
        description={`${data.windDirection}° ${data.windDirectionCompass}`}
      />
    </div>
  );
};

export default KeyMetrics;
