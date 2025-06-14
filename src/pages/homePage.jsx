"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import Header from "../components/Header";
import KeyMetrics from "../components/KeyMetrics";
import WeatherTrends from "../components/WeatherTrends";
import MapView from "../components/MapView";
import PrecipitationChart from "../components/PrecipitationChart";
import Forecast from "../components/Forecast";
import HistoricalComparison from "../components/HistoricalComparison";
import EnvironmentalImpact from "../components/EnvironmentalImpact";
import Footer from "../components/Footer";
import { fetchWeatherData } from "../api/weatherApi";

function HomePage() {
  const [location, setLocation] = useState("Benin City, Nigeria");
  const [dateRange, setDateRange] = useState("7d");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(location, dateRange);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up auto-refresh every 15 minutes
    const refreshInterval = setInterval(fetchData, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [location, dateRange]);

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location, dateRange);
      setWeatherData(data);
    } catch (error) {
      console.error("Error refreshing weather data:", error);
      setError("Failed to refresh weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    if (!weatherData) return;

    // Create CSV content
    const csvContent = generateCSVContent(weatherData, location, dateRange);

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `weather-data-${location.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-${
        new Date().toISOString().split("T")[0]
      }.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSVContent = (data, location, dateRange) => {
    let csv = `Weather Data Export for ${location}\n`;
    csv += `Export Date: ${new Date().toLocaleString()}\n`;
    csv += `Date Range: ${dateRange}\n\n`;

    // Current conditions
    csv += "Current Conditions\n";
    csv += "Metric,Value,Unit\n";
    csv += `Temperature,${data.current.temperature},°C\n`;
    csv += `Feels Like,${data.current.feelsLike},°C\n`;
    csv += `Humidity,${data.current.humidity},%\n`;
    csv += `Wind Speed,${data.current.windSpeed},km/h\n`;
    csv += `Wind Direction,${data.current.windDirectionCompass},\n`;
    csv += `Air Quality,${data.current.airQuality},AQI\n`;
    csv += `Visibility,${data.current.visibility},km\n`;
    csv += `Pressure,${data.current.pressure},hPa\n\n`;

    // Forecast data
    csv += "5-Day Forecast\n";
    csv += "Day,Date,Condition,High,Low,Precipitation\n";
    data.forecast.days.forEach((day) => {
      csv += `${day.day},${day.date},${day.condition},${day.high}°C,${day.low}°C,${day.precipitation}%\n`;
    });

    csv += "\nTrends Data\n";
    csv += `Period,${data.trends.labels.join(",")}\n`;
    csv += `Temperature (°C),${data.trends.temperature.join(",")}\n`;
    csv += `Humidity (%),${data.trends.humidity.join(",")}\n`;
    csv += `Wind Speed (km/h),${data.trends.windSpeed.join(",")}\n`;

    return csv;
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-red-600/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-6 max-w-7xl">
          <Header
            location={location}
            setLocation={setLocation}
            dateRange={dateRange}
            setDateRange={setDateRange}
            onRefresh={handleRefresh}
            onExport={handleExportData}
            loading={loading}
          />

          {loading ? (
            <div className="mt-6">
              <LoadingState location={location} />
            </div>
          ) : error ? (
            <ErrorState error={error} onRetry={handleRefresh} />
          ) : weatherData ? (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
              {/* Sidebar - Key Metrics */}
              <div className="xl:col-span-3 space-y-4">
                <KeyMetrics data={weatherData.current} />
              </div>

              {/* Main Content Area */}
              <div className="xl:col-span-9">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Weather Trends - Full Width */}
                  <div className="lg:col-span-2">
                    <WeatherTrends data={weatherData.trends} />
                  </div>

                  {/* Map View */}
                  <div>
                    <MapView
                      location={weatherData.location}
                      data={weatherData.map}
                    />
                  </div>

                  {/* Forecast */}
                  <div>
                    <Forecast data={weatherData.forecast} />
                  </div>

                  {/* Precipitation Chart */}
                  <div>
                    <PrecipitationChart data={weatherData.precipitation} />
                  </div>

                  {/* Historical Comparison */}
                  <div>
                    <HistoricalComparison data={weatherData.historical} />
                  </div>

                  {/* Environmental Impact - Full Width */}
                  <div className="lg:col-span-2">
                    <EnvironmentalImpact data={weatherData.environmental} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <NoDataState />
          )}

          <Footer lastUpdated={weatherData?.lastUpdated} location={location} />
        </div>
      </div>
    </ThemeProvider>
  );
}

// Loading State Component
const LoadingState = ({ location }) => (
  <div className="glass-card p-8 text-center max-w-lg mx-auto">
    <div className="relative mb-6">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
      <div className="animate-ping absolute top-0 left-1/2 transform -translate-x-1/2 rounded-full h-16 w-16 border-4 border-blue-300 opacity-20"></div>
    </div>
    <h3 className="text-xl font-bold text-readable mb-3">
      Loading Weather Data
    </h3>
    <p className="text-readable-light">
      Getting latest data for{" "}
      <span className="font-semibold text-blue-600">{location}</span>
    </p>
  </div>
);

// Error State Component
const ErrorState = ({ error, onRetry }) => (
  <div className="glass-card mt-6 p-8 text-center max-w-lg mx-auto">
    <div className="text-red-500 mb-4">
      <svg
        className="w-16 h-16 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-readable mb-3">
      Something went wrong
    </h3>
    <p className="text-readable-light mb-6">{error}</p>
    <button
      onClick={onRetry}
      className="btn-gradient px-6 py-2 rounded-lg font-semibold"
    >
      Try Again
    </button>
  </div>
);

// No Data State Component
const NoDataState = () => (
  <div className="glass-card mt-6 p-8 text-center max-w-lg mx-auto">
    <div className="text-gray-400 mb-4">
      <svg
        className="w-16 h-16 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-readable mb-3">No Data Available</h3>
    <p className="text-readable-light">
      Please try searching for another location.
    </p>
  </div>
);

export default HomePage;
