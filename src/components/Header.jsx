"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  MagnifyingGlass,
  ArrowsClockwise,
  MapPin,
  Lightning,
  DownloadSimple,
} from "@phosphor-icons/react";

const Header = ({
  location,
  setLocation,
  dateRange,
  setDateRange,
  onRefresh,
  onExport,
  loading = false,
}) => {
  const [searchInput, setSearchInput] = useState(location);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLocation(searchInput.trim());
    }
  };

  return (
    <Card className="glass-card border-0 shadow-lg overflow-hidden">
      <CardBody className="p-6">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          {/* Title Section */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                  <Lightning size={24} weight="fill" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <Typography
                  variant="h3"
                  className="text-gradient font-bold leading-tight"
                >
                  Weather Analytics
                </Typography>
                <Typography
                  variant="small"
                  className="text-readable-light font-medium uppercase tracking-wide"
                >
                  Real-time Climate Data
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-2 text-readable">
              <MapPin size={18} weight="fill" className="text-blue-500" />
              <Typography variant="h6" className="font-semibold">
                {location}
              </Typography>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></div>
              <Typography
                variant="small"
                className="text-green-600 font-medium"
              >
                Live
              </Typography>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="relative w-full sm:max-w-[280px]"
            >
              <div className="relative">
                <Input
                  type="text"
                  label="Search location"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pr-12 text-gray-800 font-medium"
                  containerProps={{
                    className: "min-w-0",
                  }}
                  labelProps={{
                    className: "text-gray-600 peer-focus:text-blue-500",
                  }}
                />
                <Button
                  size="sm"
                  type="submit"
                  disabled={loading}
                  className="!absolute right-1 top-1 rounded-lg btn-gradient hover:scale-105 transition-all duration-300"
                >
                  <MagnifyingGlass size={16} weight="bold" />
                </Button>
              </div>
            </form>

            {/* Date Range Selector */}
            <div className="w-full sm:w-48">
              <Select
                label="Time Range"
                value={dateRange}
                onChange={(value) => setDateRange(value)}
                className="text-gray-800 font-medium"
                labelProps={{
                  className: "text-gray-600",
                }}
                menuProps={{
                  className: "glass-card border-0 shadow-lg",
                }}
              >
                <Option
                  value="24h"
                  className="hover:bg-blue-50 transition-colors"
                >
                  Last 24 Hours
                </Option>
                <Option
                  value="7d"
                  className="hover:bg-blue-50 transition-colors"
                >
                  Last 7 Days
                </Option>
                <Option
                  value="30d"
                  className="hover:bg-blue-50 transition-colors"
                >
                  Last 30 Days
                </Option>
                <Option
                  value="90d"
                  className="hover:bg-blue-50 transition-colors"
                >
                  Last 90 Days
                </Option>
                <Option
                  value="1y"
                  className="hover:bg-blue-50 transition-colors"
                >
                  Last Year
                </Option>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                className={`flex items-center gap-2 px-4 py-2 btn-gradient rounded-lg font-semibold transition-all duration-300 ${
                  loading
                    ? "animate-pulse cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={onRefresh}
                disabled={loading}
              >
                <ArrowsClockwise
                  size={18}
                  weight="bold"
                  className={loading ? "animate-spin" : ""}
                />
                <span className="hidden sm:inline">
                  {loading ? "Loading..." : "Refresh"}
                </span>
              </Button>

              <Button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                onClick={onExport}
                disabled={loading}
              >
                <DownloadSimple size={18} weight="bold" />
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Header;
