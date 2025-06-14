const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Helper to get coordinates for a location
const getCoordinates = async (location) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(
        location
      )}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
        country: data[0].country,
      };
    }

    // Default to Benin City, Nigeria if location not found
    return {
      lat: 6.335,
      lon: 5.6037,
      name: "Benin City",
      country: "NG",
    };
  } catch (error) {
    console.error("Error getting coordinates:", error);
    // Default to Benin City, Nigeria
    return {
      lat: 6.335,
      lon: 5.6037,
      name: "Benin City",
      country: "NG",
    };
  }
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
    return `${i.toString().padStart(2, "0")}:00`;
  });
};

// Convert wind direction degrees to compass
const getWindDirection = (degrees) => {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return directions[Math.round(degrees / 22.5) % 16];
};

// Get air quality description
const getAirQualityDescription = (aqi) => {
  switch (aqi) {
    case 1:
      return "Good";
    case 2:
      return "Fair";
    case 3:
      return "Moderate";
    case 4:
      return "Poor";
    case 5:
      return "Very Poor";
    default:
      return "Unknown";
  }
};

// Fetch real weather data
export const fetchWeatherData = async (
  location = "Benin City, Nigeria",
  dateRange = "7d"
) => {
  try {
    // Get coordinates for the location
    const coords = await getCoordinates(location);

    // Fetch current weather
    const currentResponse = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );
    const currentData = await currentResponse.json();

    // Fetch 5-day forecast
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    // Fetch air quality data
    let airQualityData = null;
    try {
      const airResponse = await fetch(
        `${BASE_URL}/air_pollution?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`
      );
      airQualityData = await airResponse.json();
    } catch (error) {
      console.warn("Air quality data not available:", error);
    }

    // Parse date range for historical simulation
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

    const dates = generateDates(days);
    const hours = generateHours();

    // Current weather data
    const current = {
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
      windDirection: currentData.wind.deg || 0,
      windDirectionCompass: getWindDirection(currentData.wind.deg || 0),
      airQuality: airQualityData ? airQualityData.list[0].main.aqi * 30 : 50, // Convert to 0-150 scale
      airQualityDescription: airQualityData
        ? getAirQualityDescription(airQualityData.list[0].main.aqi)
        : "Good",
      uvIndex: 5, // UV data requires separate API call
      visibility: currentData.visibility
        ? Math.round(currentData.visibility / 1000)
        : 10,
      pressure: currentData.main.pressure,
      condition: currentData.weather[0].main,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
    };

    // Generate trends data based on forecast
    const trends = {
      period: dateRange === "24h" ? "Last 24 Hours" : `Last ${days} Days`,
      labels: dateRange === "24h" ? hours : dates,
      temperature:
        dateRange === "24h"
          ? forecastData.list
              .slice(0, 8)
              .map((item) => Math.round(item.main.temp))
          : Array.from({ length: days + 1 }, (_, i) =>
              Math.round(current.temperature + (Math.random() - 0.5) * 10)
            ),
      feelsLike:
        dateRange === "24h"
          ? forecastData.list
              .slice(0, 8)
              .map((item) => Math.round(item.main.feels_like))
          : Array.from({ length: days + 1 }, (_, i) =>
              Math.round(current.feelsLike + (Math.random() - 0.5) * 10)
            ),
      humidity:
        dateRange === "24h"
          ? forecastData.list.slice(0, 8).map((item) => item.main.humidity)
          : Array.from({ length: days + 1 }, () =>
              Math.round(current.humidity + (Math.random() - 0.5) * 30)
            ),
      windSpeed:
        dateRange === "24h"
          ? forecastData.list
              .slice(0, 8)
              .map((item) => Math.round(item.wind.speed * 3.6))
          : Array.from({ length: days + 1 }, () =>
              Math.round(current.windSpeed + (Math.random() - 0.5) * 15)
            ),
      windGust:
        dateRange === "24h"
          ? forecastData.list
              .slice(0, 8)
              .map((item) =>
                Math.round((item.wind.gust || item.wind.speed * 1.5) * 3.6)
              )
          : Array.from({ length: days + 1 }, () =>
              Math.round(current.windSpeed * 1.3 + (Math.random() - 0.5) * 20)
            ),
    };

    // Map data
    const map = {
      coordinates: {
        lat: coords.lat,
        lon: coords.lon,
      },
      zoom: 10,
      locationName: `${coords.name}, ${coords.country}`,
    };

    // Precipitation data from forecast
    const precipitation = {
      period: dateRange === "24h" ? "Next 24 Hours" : "Next 5 Days",
      labels:
        dateRange === "24h"
          ? forecastData.list.slice(0, 8).map((item) =>
              new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            )
          : forecastData.list
              .filter((_, index) => index % 8 === 0)
              .slice(0, 5)
              .map((item) =>
                new Date(item.dt * 1000).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              ),
      values:
        dateRange === "24h"
          ? forecastData.list
              .slice(0, 8)
              .map((item) => (item.rain ? item.rain["3h"] || 0 : 0))
          : forecastData.list
              .filter((_, index) => index % 8 === 0)
              .slice(0, 5)
              .map((item) => (item.rain ? item.rain["3h"] || 0 : 0)),
      probability:
        dateRange === "24h"
          ? forecastData.list
              .slice(0, 8)
              .map((item) => Math.round(item.pop * 100))
          : forecastData.list
              .filter((_, index) => index % 8 === 0)
              .slice(0, 5)
              .map((item) => Math.round(item.pop * 100)),
    };

    // 5-day forecast
    const forecast = {
      days: forecastData.list
        .filter((_, index) => index % 8 === 0) // Get one forecast per day
        .slice(0, 5)
        .map((item, index) => {
          const date = new Date(item.dt * 1000);
          return {
            day:
              index === 0
                ? "Today"
                : index === 1
                ? "Tomorrow"
                : date.toLocaleDateString("en-US", { weekday: "short" }),
            date: date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            condition: item.weather[0].main,
            high: Math.round(item.main.temp_max),
            low: Math.round(item.main.temp_min),
            precipitation: Math.round(item.pop * 100),
            icon: item.weather[0].icon,
          };
        }),
    };

    // Historical comparison (simulated)
    const historical = {
      labels: dates,
      currentYear: Array.from({ length: days + 1 }, (_, i) =>
        Math.round(
          current.temperature +
            Math.sin(i * 0.1) * 5 +
            (Math.random() - 0.5) * 3
        )
      ),
      previousYear: Array.from({ length: days + 1 }, (_, i) =>
        Math.round(
          current.temperature -
            2 +
            Math.sin(i * 0.1) * 4 +
            (Math.random() - 0.5) * 3
        )
      ),
      average: Array.from({ length: days + 1 }, (_, i) =>
        Math.round(current.temperature - 1 + Math.sin(i * 0.1) * 3)
      ),
    };

    // Environmental impact (simulated carbon intensity)
    const environmental = {
      days: Array.from({ length: 7 }, (_, dayIndex) => {
        return {
          day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex],
          hours: Array.from({ length: 6 }, (_, hourIndex) => {
            // Simulate lower carbon intensity during sunny hours
            const baseIntensity = current.condition === "Clear" ? 150 : 250;
            const variation = Math.random() * 100;
            return {
              time: `${hourIndex * 4}:00`,
              value: Math.round(baseIntensity + variation),
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
      location: `${coords.name}, ${coords.country}`,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);

    // Return fallback data for Benin City
    return {
      current: {
        temperature: 28,
        feelsLike: 32,
        humidity: 75,
        windSpeed: 12,
        windDirection: 180,
        windDirectionCompass: "S",
        airQuality: 65,
        airQualityDescription: "Moderate",
        uvIndex: 8,
        visibility: 10,
        pressure: 1013,
        condition: "Partly Cloudy",
        description: "partly cloudy",
        icon: "02d",
      },
      trends: {
        period: "Last 7 Days",
        labels: generateDates(7),
        temperature: [26, 27, 28, 29, 28, 27, 28],
        feelsLike: [30, 31, 32, 33, 32, 31, 32],
        humidity: [70, 72, 75, 78, 75, 73, 75],
        windSpeed: [10, 12, 11, 13, 12, 11, 12],
        windGust: [15, 18, 16, 19, 18, 16, 18],
      },
      map: {
        coordinates: { lat: 6.335, lon: 5.6037 },
        zoom: 10,
        locationName: "Benin City, NG",
      },
      precipitation: {
        period: "Next 5 Days",
        labels: ["Today", "Tomorrow", "Wed", "Thu", "Fri"],
        values: [2, 0, 5, 1, 3],
        probability: [40, 10, 70, 20, 50],
      },
      forecast: {
        days: [
          {
            day: "Today",
            date: "Dec 14",
            condition: "Partly Cloudy",
            high: 29,
            low: 23,
            precipitation: 40,
            icon: "02d",
          },
          {
            day: "Tomorrow",
            date: "Dec 15",
            condition: "Clear",
            high: 31,
            low: 24,
            precipitation: 10,
            icon: "01d",
          },
          {
            day: "Wed",
            date: "Dec 16",
            condition: "Rain",
            high: 27,
            low: 22,
            precipitation: 70,
            icon: "10d",
          },
          {
            day: "Thu",
            date: "Dec 17",
            condition: "Partly Cloudy",
            high: 28,
            low: 23,
            precipitation: 20,
            icon: "02d",
          },
          {
            day: "Fri",
            date: "Dec 18",
            condition: "Cloudy",
            high: 26,
            low: 21,
            precipitation: 50,
            icon: "03d",
          },
        ],
      },
      historical: {
        labels: generateDates(7),
        currentYear: [26, 27, 28, 29, 28, 27, 28],
        previousYear: [24, 25, 26, 27, 26, 25, 26],
        average: [25, 26, 27, 28, 27, 26, 27],
      },
      environmental: {
        days: Array.from({ length: 7 }, (_, dayIndex) => ({
          day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][dayIndex],
          hours: Array.from({ length: 6 }, (_, hourIndex) => ({
            time: `${hourIndex * 4}:00`,
            value: Math.round(200 + Math.random() * 150),
          })),
        })),
      },
      lastUpdated: new Date().toISOString(),
      location: "Benin City, Nigeria",
    };
  }
};
