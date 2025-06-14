"use client";

import { Card, CardBody, Typography, Chip } from "@material-tailwind/react";
import { Clock, Database, MapPin } from "@phosphor-icons/react";

const Footer = ({ lastUpdated, location }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getUpdateStatus = () => {
    if (!lastUpdated) return { text: "Unknown", color: "bg-gray-500" };

    const now = new Date();
    const updated = new Date(lastUpdated);
    const diffMinutes = Math.floor((now - updated) / (1000 * 60));

    if (diffMinutes < 5)
      return {
        text: "Just now",
        color: "bg-gradient-to-r from-green-400 to-green-600",
      };
    if (diffMinutes < 15)
      return {
        text: `${diffMinutes}m ago`,
        color: "bg-gradient-to-r from-blue-400 to-blue-600",
      };
    if (diffMinutes < 60)
      return {
        text: `${diffMinutes}m ago`,
        color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      };
    return {
      text: "Over 1h ago",
      color: "bg-gradient-to-r from-red-400 to-red-600",
    };
  };

  const updateStatus = getUpdateStatus();

  return (
    <Card className="glass-card border-0 shadow-lg mt-6">
      <CardBody className="p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Data Sources */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Database size={18} weight="fill" />
              </div>
              <div>
                <Typography className="text-readable font-semibold">
                  Data Sources
                </Typography>
                <Typography variant="small" className="text-readable-light">
                  OpenWeatherMap, EPA, NOAA
                </Typography>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" weight="fill" />
              <Typography variant="small" className="text-readable font-medium">
                Real-time data for {location}
              </Typography>
            </div>
          </div>

          {/* Update Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-600" weight="fill" />
              <div>
                <Typography variant="small" className="text-readable-light">
                  Updated: {formatDate(lastUpdated)}
                </Typography>
              </div>
            </div>

            <Chip
              value={updateStatus.text}
              size="sm"
              className={`${updateStatus.color} text-white font-medium`}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-white/30">
          <Typography
            variant="small"
            className="text-readable-light text-center font-medium"
          >
            Weather Analytics Dashboard • Built for {location} • Real-time
            Climate Monitoring
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};

export default Footer;
