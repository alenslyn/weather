import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

import BelgradeImg from "../assets/images/belgrade.jpeg";

export default function CardFunc() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "0b310c5fe47ad534d9b604b9c7a52e63";
        const city = "Belgrade";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
        } else {
          throw new Error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Box component="ul" sx={{ display: "flex", flexWrap: "wrap", p: 0, m: 0 }}>
      <Card component="li" sx={{ minWidth: 500, height: 400 }}>
        <CardCover>
          <img src={BelgradeImg} loading="lazy" alt="weather_img" />
        </CardCover>
        <CardContent>
          {weather && (
            <>
              <Typography
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 12, sm: 30 }}
              >
                Weather for {weather.name}, {weather.sys.country}
              </Typography>
              <Typography variant="body1" textColor="#fff">
                Temperature: {weather.main.temp}°C
              </Typography>
              <Typography variant="body1" textColor="#fff">
                Description: {weather.weather[0].description}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
