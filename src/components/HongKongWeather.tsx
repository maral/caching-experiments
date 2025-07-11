import { withDelay } from "@/utils/delay";
import React from "react";

type WeatherData = {
  temperature: { data: { value: number }[] };
  humidity: { data: { value: number }[] };
  rainfall: { data: { max: number }[] };
};

export default async function HongKongWeather() {
  const response = await withDelay(
    fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en",
      {
        cache: "no-store",
      }
    ),
    2000
  );

  if (!response.ok) {
    console.error("Failed to fetch weather data");
    return <div>Error loading weather data</div>;
  }

  const weatherData: WeatherData = await response.json();

  console.log("HongKongWeather");

  return (
    <div className="p-2 bg-blue-100 rounded-lg shadow-md">
      {weatherData && weatherData.temperature && (
        <div className="flex space-x-4 text-gray-700">
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Temperature" className="text-xl">
              🌡️
            </span>
            <span className="inline-block w-10">
              {weatherData.temperature.data[0].value}°C
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Humidity" className="text-xl">
              💧
            </span>
            <span className="inline-block w-10">
              {weatherData.humidity.data[0].value}%
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Rainfall" className="text-xl">
              🌧️
            </span>
            <span className="inline-block w-10">
              {weatherData.rainfall.data[0].max} mm
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function HongKongWeatherSkeleton() {
  return (
    <div className="p-2 bg-blue-100 rounded-lg shadow-md">
      <div className="flex space-x-4 text-gray-700">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Temperature" className="text-xl">
            🌡️
          </span>
          <span className="animate-pulse bg-gray-300 rounded w-10 h-6"></span>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Humidity" className="text-xl">
            💧
          </span>
          <span className="animate-pulse bg-gray-300 rounded w-10 h-6"></span>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Rainfall" className="text-xl">
            🌧️
          </span>
          <span className="animate-pulse bg-gray-300 rounded w-10 h-6"></span>
        </div>
      </div>
    </div>
  );
}
