import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import {
  Thermometer,
  Wind,
  Drop,
  Leaf,
  Eye,
  Gauge,
  Sun,
  TrendUp,
  TrendDown,
} from "@phosphor-icons/react";

const MetricCard = ({
  icon,
  title,
  value,
  unit,
  gradient,
  description,
  chip,
  trend,
}) => {
  return (
    <Card className="metric-card group cursor-pointer">
      <CardBody className="p-4">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-lg p-3 ${gradient} text-white shadow-lg group-hover:scale-110 transition-all duration-300 relative overflow-hidden`}
          >
            <div className="relative z-10">{icon}</div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <Typography
                variant="small"
                className="text-readable font-semibold truncate"
              >
                {title}
              </Typography>
              {trend && (
                <div className="flex items-center gap-1">
                  {trend > 0 ? (
                    <TrendUp
                      size={12}
                      className="text-green-600"
                      weight="bold"
                    />
                  ) : (
                    <TrendDown
                      size={12}
                      className="text-red-600"
                      weight="bold"
                    />
                  )}
                  <Typography
                    variant="small"
                    className={`font-bold ${
                      trend > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(trend)}%
                  </Typography>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-1 mb-2">
              <Typography
                variant="h4"
                className="font-bold text-gray-900 leading-none"
              >
                {value}
              </Typography>
              <Typography
                variant="small"
                className="text-readable-light font-medium"
              >
                {unit}
              </Typography>
            </div>

            {description && (
              <Typography
                variant="small"
                className="text-readable-light mb-2 line-clamp-1"
              >
                {description}
              </Typography>
            )}

            {chip && (
              <Chip
                value={chip.text}
                size="sm"
                className={`${chip.color} text-white font-medium`}
                variant="filled"
              />
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

const KeyMetrics = ({ data }) => {
  if (!data) return null;

  const getAirQualityChip = (aqi) => {
    if (aqi <= 50)
      return {
        text: "Good",
        color: "bg-gradient-to-r from-green-400 to-green-600",
      };
    if (aqi <= 100)
      return {
        text: "Fair",
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
      };
    if (aqi <= 150)
      return {
        text: "Moderate",
        color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      };
    if (aqi <= 200)
      return {
        text: "Poor",
        color: "bg-gradient-to-r from-orange-400 to-orange-600",
      };
    return {
      text: "Very Poor",
      color: "bg-gradient-to-r from-red-400 to-red-600",
    };
  };

  const getHumidityDescription = (humidity) => {
    if (humidity > 80) return "Very humid";
    if (humidity > 60) return "Comfortable";
    if (humidity > 40) return "Moderate";
    if (humidity > 20) return "Low humidity";
    return "Very dry";
  };

  const getTemperatureDescription = (temp, feelsLike) => {
    const diff = Math.abs(temp - feelsLike);
    if (diff <= 1) return "Feels accurate";
    return `Feels ${feelsLike > temp ? "warmer" : "cooler"}`;
  };

  const getVisibilityDescription = (visibility) => {
    if (visibility >= 20) return "Crystal clear";
    if (visibility >= 10) return "Excellent";
    if (visibility >= 5) return "Good";
    if (visibility >= 2) return "Moderate";
    return "Poor";
  };

  const getPressureDescription = (pressure) => {
    if (pressure > 1020) return "High pressure";
    if (pressure > 1000) return "Normal";
    return "Low pressure";
  };

  return (
    <div className="space-y-4">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Sun size={20} weight="fill" />
          </div>
          <div>
            <Typography variant="h5" className="text-gradient font-bold">
              Current Conditions
            </Typography>
            <Typography
              variant="small"
              className="text-readable-light font-medium"
            >
              Live weather data
            </Typography>
          </div>
        </div>
      </div>

      <MetricCard
        icon={<Thermometer size={24} weight="fill" />}
        title="Temperature"
        value={data.temperature}
        unit="°C"
        gradient="bg-gradient-to-br from-orange-400 via-red-500 to-pink-500"
        description={getTemperatureDescription(
          data.temperature,
          data.feelsLike
        )}
        trend={2.5}
      />

      <MetricCard
        icon={<Leaf size={24} weight="fill" />}
        title="Air Quality"
        value={data.airQuality}
        unit="AQI"
        gradient="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"
        description="Air quality index"
        chip={getAirQualityChip(data.airQuality)}
        trend={-1.2}
      />

      <MetricCard
        icon={<Drop size={24} weight="fill" />}
        title="Humidity"
        value={data.humidity}
        unit="%"
        gradient="bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500"
        description={getHumidityDescription(data.humidity)}
        trend={0.8}
      />

      <MetricCard
        icon={<Wind size={24} weight="fill" />}
        title="Wind Speed"
        value={data.windSpeed}
        unit="km/h"
        gradient="bg-gradient-to-br from-purple-400 via-violet-500 to-indigo-500"
        description={`${data.windDirectionCompass} direction`}
        trend={-3.1}
      />

      <MetricCard
        icon={<Eye size={24} weight="fill" />}
        title="Visibility"
        value={data.visibility}
        unit="km"
        gradient="bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-500"
        description={getVisibilityDescription(data.visibility)}
        trend={1.5}
      />

      <MetricCard
        icon={<Gauge size={24} weight="fill" />}
        title="Pressure"
        value={data.pressure}
        unit="hPa"
        gradient="bg-gradient-to-br from-pink-400 via-rose-500 to-red-500"
        description={getPressureDescription(data.pressure)}
        trend={0.3}
      />
    </div>
  );
};

export default KeyMetrics;
