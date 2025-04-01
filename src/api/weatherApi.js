// This is a mock API service that would be replaced with real API calls in a production app

// Helper to generate random data
const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate dates for the last n days
const generateDates = (days) => {
  const dates = [];
  const today = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );
  }

  return dates;
};

// Generate hours for a day
const generateHours = () => {
  return Array.from({ length: 24 }, (_, i) => {
    return `${i}:00`;
  });
};

// Generate mock weather data
export const fetchWeatherData = async (location, dateRange) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Parse date range
  let days = 7;
  switch (dateRange) {
    case "24h":
      days = 1;
      break;
    case "7d":
      days = 7;
      break;
    case "30d":
      days = 30;
      break;
    case "90d":
      days = 90;
      break;
    case "1y":
      days = 365;
      break;
    default:
      days = 7;
  }

  // Generate dates
  const dates = generateDates(days);
  const hours = generateHours();

  // Current weather data
  const current = {
    temperature: getRandomValue(15, 30),
    feelsLike: getRandomValue(14, 32),
    humidity: getRandomValue(30, 90),
    windSpeed: getRandomValue(5, 25),
    windDirection: getRandomValue(0, 359),
    windDirectionCompass: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
      getRandomValue(0, 7)
    ],
    airQuality: getRandomValue(20, 150),
    uvIndex: getRandomValue(0, 11),
    visibility: getRandomValue(5, 20),
    pressure: getRandomValue(990, 1030),
  };

  // Weather trends data
  const trends = {
    period: dateRange === "24h" ? "Last 24 Hours" : `Last ${days} Days`,
    labels: dateRange === "24h" ? hours : dates,
    temperature: Array.from(
      { length: dateRange === "24h" ? 24 : days + 1 },
      () => getRandomValue(15, 30)
    ),
    feelsLike: Array.from({ length: dateRange === "24h" ? 24 : days + 1 }, () =>
      getRandomValue(14, 32)
    ),
    humidity: Array.from({ length: dateRange === "24h" ? 24 : days + 1 }, () =>
      getRandomValue(30, 90)
    ),
    windSpeed: Array.from({ length: dateRange === "24h" ? 24 : days + 1 }, () =>
      getRandomValue(5, 25)
    ),
    windGust: Array.from({ length: dateRange === "24h" ? 24 : days + 1 }, () =>
      getRandomValue(8, 35)
    ),
  };

  // Map data
  const map = {
    coordinates: {
      lat: 40.7128, // New York by default
      lon: -74.006,
    },
    zoom: 10,
  };

  // Precipitation data
  const precipitation = {
    period: dateRange === "24h" ? "Last 24 Hours" : `Last ${days} Days`,
    labels: dateRange === "24h" ? hours : dates,
    values: Array.from({ length: dateRange === "24h" ? 24 : days + 1 }, () =>
      getRandomValue(0, 20)
    ),
    probability: Array.from(
      { length: dateRange === "24h" ? 24 : days + 1 },
      () => getRandomValue(0, 100)
    ),
  };

  // Forecast data
  const forecast = {
    days: [
      {
        day: "Today",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        condition: ["Clear", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm"][
          getRandomValue(0, 4)
        ],
        high: getRandomValue(20, 30),
        low: getRandomValue(10, 19),
        precipitation: getRandomValue(0, 100),
      },
      {
        day: "Tomorrow",
        date: new Date(Date.now() + 86400000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        condition: ["Clear", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm"][
          getRandomValue(0, 4)
        ],
        high: getRandomValue(20, 30),
        low: getRandomValue(10, 19),
        precipitation: getRandomValue(0, 100),
      },
      {
        day: new Date(Date.now() + 86400000 * 2).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: new Date(Date.now() + 86400000 * 2).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        condition: ["Clear", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm"][
          getRandomValue(0, 4)
        ],
        high: getRandomValue(20, 30),
        low: getRandomValue(10, 19),
        precipitation: getRandomValue(0, 100),
      },
      {
        day: new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: new Date(Date.now() + 86400000 * 3).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        condition: ["Clear", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm"][
          getRandomValue(0, 4)
        ],
        high: getRandomValue(20, 30),
        low: getRandomValue(10, 19),
        precipitation: getRandomValue(0, 100),
      },
      {
        day: new Date(Date.now() + 86400000 * 4).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: new Date(Date.now() + 86400000 * 4).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        condition: ["Clear", "Partly Cloudy", "Cloudy", "Rain", "Thunderstorm"][
          getRandomValue(0, 4)
        ],
        high: getRandomValue(20, 30),
        low: getRandomValue(10, 19),
        precipitation: getRandomValue(0, 100),
      },
    ],
  };

  // Historical comparison data
  const historical = {
    labels: dates,
    currentYear: Array.from({ length: days + 1 }, () => getRandomValue(15, 30)),
    previousYear: Array.from({ length: days + 1 }, () =>
      getRandomValue(14, 29)
    ),
    average: Array.from({ length: days + 1 }, () => getRandomValue(16, 28)),
  };

  // Environmental impact data (carbon intensity heat map)
  const environmental = {
    days: Array.from({ length: 7 }, (_, dayIndex) => {
      return {
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex],
        hours: Array.from({ length: 6 }, (_, hourIndex) => {
          return {
            time: `${hourIndex * 4}:00`,
            value: getRandomValue(50, 400),
          };
        }),
      };
    }),
  };

  return {
    current,
    trends,
    map,
    precipitation,
    forecast,
    historical,
    environmental,
    lastUpdated: new Date().toISOString(),
  };
};
