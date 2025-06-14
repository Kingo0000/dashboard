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
  Calendar,
} from "@phosphor-icons/react";

const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case "clear":
      return (
        <Sun size={32} weight="fill" className="text-yellow-500 weather-icon" />
      );
    case "partly cloudy":
      return (
        <CloudSun
          size={32}
          weight="fill"
          className="text-gray-500 weather-icon"
        />
      );
    case "cloudy":
      return (
        <Cloud size={32} weight="fill" className="text-gray-500 weather-icon" />
      );
    case "rain":
      return (
        <CloudRain
          size={32}
          weight="fill"
          className="text-blue-500 weather-icon"
        />
      );
    case "snow":
      return (
        <CloudSnow
          size={32}
          weight="fill"
          className="text-blue-200 weather-icon"
        />
      );
    case "thunderstorm":
      return (
        <CloudLightning
          size={32}
          weight="fill"
          className="text-purple-500 weather-icon"
        />
      );
    case "fog":
      return (
        <CloudFog
          size={32}
          weight="fill"
          className="text-gray-400 weather-icon"
        />
      );
    default:
      return (
        <Sun size={32} weight="fill" className="text-yellow-500 weather-icon" />
      );
  }
};

const ForecastCard = ({ day, date, condition, high, low, precipitation }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white/40 rounded-lg mb-2 hover:bg-white/60 transition-all duration-300 hover:transform hover:translate-x-1">
      <div className="flex flex-col">
        <Typography variant="h6" className="font-bold text-gray-900">
          {day}
        </Typography>
        <Typography variant="small" className="text-readable-light font-medium">
          {date}
        </Typography>
      </div>

      <div className="flex items-center justify-center mx-4">
        {getWeatherIcon(condition)}
      </div>

      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 mb-1">
          <Typography variant="h6" className="font-bold text-gray-900">
            {high}°
          </Typography>
          <Typography
            variant="small"
            className="text-readable-light font-medium"
          >
            {low}°
          </Typography>
        </div>
        {precipitation > 0 && (
          <Chip
            value={`${precipitation}% rain`}
            size="sm"
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-medium"
          />
        )}
      </div>
    </div>
  );
};

const Forecast = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="chart-container border-0 shadow-lg">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0 bg-transparent"
      >
        <div className="px-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
              <Calendar size={20} weight="fill" />
            </div>
            <div>
              <Typography variant="h5" className="text-gradient font-bold">
                5-Day Forecast
              </Typography>
              <Typography
                variant="small"
                className="text-readable-light font-medium"
              >
                Extended outlook
              </Typography>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div>
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
        </div>
      </CardBody>
    </Card>
  );
};

export default Forecast;
