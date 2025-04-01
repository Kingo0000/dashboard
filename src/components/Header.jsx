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
  Calendar,
  ArrowsClockwise,
} from "@phosphor-icons/react";

const Header = ({
  location,
  setLocation,
  dateRange,
  setDateRange,
  onRefresh,
}) => {
  const [searchInput, setSearchInput] = useState(location);

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(searchInput);
  };

  return (
    <Card className="shadow-lg dark:bg-gray-800">
      <CardBody className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex-1">
            <Typography
              variant="h4"
              className="text-gray-800 dark:text-white font-bold"
            >
              Climate & Weather Analytics Dashboard
            </Typography>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <form
              onSubmit={handleSearch}
              className="relative flex w-full max-w-[24rem]"
            >
              <Input
                type="text"
                label="Search location"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pr-20 dark:text-white"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                type="submit"
                className="!absolute right-1 top-1 rounded"
              >
                <MagnifyingGlass size={20} />
              </Button>
            </form>

            <div className="w-full sm:w-48">
              <Select
                label="Date Range"
                value={dateRange}
                onChange={(value) => setDateRange(value)}
                icon={<Calendar size={20} />}
              >
                <Option value="24h">Last 24 Hours</Option>
                <Option value="7d">Last 7 Days</Option>
                <Option value="30d">Last 30 Days</Option>
                <Option value="90d">Last 90 Days</Option>
                <Option value="1y">Last Year</Option>
              </Select>
            </div>

            <Button className="flex items-center gap-2" onClick={onRefresh}>
              <ArrowsClockwise size={20} />
              Refresh
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Header;
