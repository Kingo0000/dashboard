import { useState, useEffect } from "react";
import { ThemeProvider } from "@material-tailwind/react";
import { Sun, Moon } from "@phosphor-icons/react";
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
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("New York, NY");
  const [dateRange, setDateRange] = useState("7d");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchWeatherData(location, dateRange);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Set up auto-refresh every 15 minutes
    const refreshInterval = setInterval(fetchData, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [location, dateRange]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchWeatherData(location, dateRange);
      setWeatherData(data);
    } catch (error) {
      console.error("Error refreshing weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "dark bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          <Header
            location={location}
            setLocation={setLocation}
            dateRange={dateRange}
            setDateRange={setDateRange}
            onRefresh={handleRefresh}
          />

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : weatherData ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-3">
                <KeyMetrics data={weatherData.current} />
              </div>

              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <WeatherTrends data={weatherData.trends} />
                  </div>

                  <div>
                    <MapView location={location} data={weatherData.map} />
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <PrecipitationChart data={weatherData.precipitation} />
                    <Forecast data={weatherData.forecast} />
                  </div>

                  <div>
                    <HistoricalComparison data={weatherData.historical} />
                  </div>

                  <div>
                    <EnvironmentalImpact data={weatherData.environmental} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No data available. Please try another location.
              </p>
            </div>
          )}

          <Footer lastUpdated={weatherData?.lastUpdated} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
