import { useState, useEffect } from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import snow from "../assets/images/snow.jpeg";
import rain from "../assets/images/rain.jpeg";
import defaultImg from "../assets/images/default.jpeg";
import BelgradeImg from "../assets/images/belgrade.jpeg";
import "./Card.css";

const list = ["Belgrade", "Novi Sad", "Nis"];

const fetchWeather = async (city, setWeather) => {
  try {
    const apiKey = "0b310c5fe47ad534d9b604b9c7a52e63";
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

export default function CardFunc() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("");

  const handleCityChange = (e) => {
    setCityName(e.target.value);
  };

  useEffect(() => {
    if (cityName !== "") {
      fetchWeather(cityName, setWeather);
    }
  }, [cityName]);

  let imageSrc = defaultImg;

  if (
    weather &&
    weather.weather &&
    weather.weather[0].description.toLowerCase().includes("clear")
  ) {
    imageSrc = BelgradeImg;
  }

  if (
    weather &&
    weather.weather &&
    weather.weather[0].description.toLowerCase().includes("snow")
  ) {
    imageSrc = snow;
  }
  if (
    weather &&
    weather.weather &&
    weather.weather[0].description.toLowerCase().includes("rain")
  ) {
    imageSrc = rain;
  }

  return (
    <Box component="ul" sx={{ display: "flex", flexWrap: "wrap", p: 0, m: 0 }}>
      <Card component="li" sx={{ minWidth: 500, height: 400 }}>
        <CardCover>
          <img src={imageSrc} loading="lazy" alt="weather_img" />
        </CardCover>
        <CardContent>
          <div>
            <label htmlFor="cityInput" />
            <select
              className="input_title"
              id="cityInput"
              value={cityName}
              onChange={handleCityChange}
            >
              <option className="city_option" value="">
                Select a city
              </option>
              {list.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          {weather && (
            <>
              <Typography
                level="body-lg"
                fontWeight="lg"
                textColor="#fff"
                mt={{ xs: 12, sm: 30 }}
              >
                Weather for {weather.name}, {weather.sys.city}
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
