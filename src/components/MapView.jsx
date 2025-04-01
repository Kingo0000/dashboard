"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { MapPin } from "@phosphor-icons/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ location, data }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({});

  useEffect(() => {
    if (!mapRef.current || !data) return;

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [data.coordinates.lat, data.coordinates.lon],
        10
      );

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add location marker
      L.marker([data.coordinates.lat, data.coordinates.lon])
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>${location}</b>`)
        .openPopup();
    } else {
      // Update map view if location changes
      mapInstanceRef.current.setView(
        [data.coordinates.lat, data.coordinates.lon],
        10
      );

      // Clear existing markers and add new one
      mapInstanceRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      L.marker([data.coordinates.lat, data.coordinates.lon])
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>${location}</b>`)
        .openPopup();
    }

    // Clean up on unmount
    return () => {
      if (mapInstanceRef.current) {
        // We don't actually remove the map here to prevent re-initialization issues
        // Just clean up layers if needed
        Object.values(layersRef.current).forEach((layer) => {
          if (mapInstanceRef.current.hasLayer(layer)) {
            mapInstanceRef.current.removeLayer(layer);
          }
        });
      }
    };
  }, [location, data]);

  const toggleLayer = (layerName) => {
    if (!mapInstanceRef.current) return;

    if (layersRef.current[layerName]) {
      if (mapInstanceRef.current.hasLayer(layersRef.current[layerName])) {
        mapInstanceRef.current.removeLayer(layersRef.current[layerName]);
      } else {
        mapInstanceRef.current.addLayer(layersRef.current[layerName]);
      }
    } else {
      // Create new layer based on layer name
      switch (layerName) {
        case "temperature":
          // This would be a real temperature overlay in a production app
          layersRef.current[layerName] = L.tileLayer(
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY`,
            { opacity: 0.5 }
          );
          break;
        case "precipitation":
          layersRef.current[layerName] = L.tileLayer(
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY`,
            { opacity: 0.5 }
          );
          break;
        case "clouds":
          layersRef.current[layerName] = L.tileLayer(
            `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY`,
            { opacity: 0.5 }
          );
          break;
        case "wind":
          layersRef.current[layerName] = L.tileLayer(
            `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=YOUR_API_KEY`,
            { opacity: 0.5 }
          );
          break;
        default:
          break;
      }

      if (layersRef.current[layerName]) {
        mapInstanceRef.current.addLayer(layersRef.current[layerName]);
      }
    }
  };

  if (!data) return null;

  return (
    <Card className="shadow-lg h-full dark:bg-gray-800">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pt-4 pb-0"
      >
        <div className="px-4">
          <div className="flex items-center gap-2">
            <MapPin size={24} className="text-blue-500" />
            <Typography
              variant="h5"
              className="text-gray-800 dark:text-white font-bold"
            >
              Interactive Map View
            </Typography>
          </div>
          <Typography
            color="gray"
            className="mt-1 text-gray-600 dark:text-gray-400"
          >
            Weather patterns and overlays
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-4 pb-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <Checkbox
            label="Temperature"
            onChange={() => toggleLayer("temperature")}
            color="red"
          />
          <Checkbox
            label="Precipitation"
            onChange={() => toggleLayer("precipitation")}
            color="blue"
          />
          <Checkbox
            label="Clouds"
            onChange={() => toggleLayer("clouds")}
            color="gray"
          />
          <Checkbox
            label="Wind"
            onChange={() => toggleLayer("wind")}
            color="teal"
          />
        </div>
        <div ref={mapRef} className="h-[300px] w-full rounded-lg z-0"></div>
      </CardBody>
    </Card>
  );
};

export default MapView;
