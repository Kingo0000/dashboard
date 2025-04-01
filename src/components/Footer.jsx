"use client";

import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { Info, DownloadSimple } from "@phosphor-icons/react";

const Footer = ({ lastUpdated }) => {
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

  const handleExportData = () => {
    // In a real app, this would generate and download a CSV/PDF file
    alert(
      "This would export the current data to CSV/PDF in a real application."
    );
  };

  return (
    <Card className="shadow-lg mt-6 dark:bg-gray-800">
      <CardBody className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Info size={20} className="text-blue-500" />
            <Typography className="text-gray-700 dark:text-gray-300">
              Data Sources: OpenWeatherMap, National Weather Service, EPA
            </Typography>
          </div>

          <div className="flex items-center gap-4">
            <Typography className="text-gray-600 dark:text-gray-400">
              Last Updated: {formatDate(lastUpdated)}
            </Typography>

            <Button
              variant="outlined"
              className="flex items-center gap-2"
              onClick={handleExportData}
            >
              <DownloadSimple size={20} />
              Export Data
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Footer;
