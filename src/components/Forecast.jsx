import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudSun,
} from "@phosphor-icons/react";

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return <Sun size={36} weight="fill" className="text-yellow-500" />;
    case "partly cloudy":
      return <CloudSun size={36} weight="fill" className="text-gray-500" />;
    case "cloudy":
      return <Cloud size={36} weight="fill" className="text-gray-500" />;
    case "rain":
      return <CloudRain size={36} weight="fill" className="text-blue-500" />;
    case "snow":
      return <CloudSnow size={36} weight="fill" className="text-blue-200" />;
    case "thunderstorm":
      return (
        <CloudLightning size={36} weight="fill" className="text-purple-500" />
      );
    case "fog":
      return <CloudFog size={36} weight="fill" className="text-gray-400" />;
    default:
      return <Sun size={36} weight="fill" className="text-yellow-500" />;
  }
};

const ForecastCard = ({ day, date, condition, high, low, precipitation }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b dark:border-gray-700 last:border-0">
      <div className="flex flex-col">
        <Typography
          variant="h6"
          className="font-bold text-gray-800 dark:text-white"
        >
          {day}
        </Typography>
        <Typography
          variant="small"
          className="text-gray-600 dark:text-gray-400"
        >
          {date}
        </Typography>
      </div>

      <div className="flex items-center justify-center">
        {getWeatherIcon(condition)}
      </div>

      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <Typography
            variant="h6"
            className="font-bold text-gray-800 dark:text-white"
          >
            {high}°
          </Typography>
          <Typography className="text-gray-600 dark:text-gray-400">
            {low}°
          </Typography>
        </div>
        {precipitation > 0 && (
          <Chip
            value={`${precipitation}% rain`}
            size="sm"
            variant="ghost"
            color="blue"
            className="normal-case"
          />
        )}
      </div>
    </div>
  );
};

const Forecast = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="shadow-lg dark:bg-gray-800">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0"
      >
        <div className="px-4">
          <Typography
            variant="h5"
            className="text-gray-800 dark:text-white font-bold"
          >
            5-Day Forecast
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        {data.days.map((day, index) => (
          <ForecastCard
            key={index}
            day={day.day}
            date={day.date}
            condition={day.condition}
            high={day.high}
            low={day.low}
            precipitation={day.precipitation}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default Forecast;
