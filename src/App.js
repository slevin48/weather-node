import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Sample data for when API is not available
const sampleWeather = {
  name: "Sample City",
  main: {
    temp: 20,
    humidity: 65
  },
  weather: [{
    description: "sample weather",
    icon: "01d"
  }],
  wind: {
    speed: 5.2
  }
};

const sampleForecast = Array(5).fill(null).map((_, index) => ({
  dt: Math.floor(Date.now() / 1000) + (index * 86400),
  main: {
    temp: 20 + Math.floor(Math.random() * 5)
  },
  weather: [{
    description: "sample weather",
    icon: "01d"
  }]
}));

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace with your OpenWeather API key
  const API_KEY = ''; // Set your API key here
  const CITY = 'Paris'; // Default city

  useEffect(() => {
    const fetchWeather = async () => {
      // If no API key is provided, use sample data
      if (!API_KEY) {
        setWeather(sampleWeather);
        setForecast(sampleForecast);
        setLoading(false);
        setError('Using sample data - please add your OpenWeather API key');
        return;
      }

      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`
        );
        setForecast(forecastResponse.data.list);
        setLoading(false);
      } catch (err) {
        console.error('Weather API Error:', err);
        // Use sample data on error
        setWeather(sampleWeather);
        setForecast(sampleForecast);
        setError('Using sample data due to API error');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (!weather) return null;
  
  // Show error as a banner if using sample data
  const errorBanner = error && (
    <div className="error-banner">{error}</div>
  );

  return (
    <div className="App">
      {errorBanner}
      <div className="weather-container">
        <h1>Weather in {weather.name}</h1>
        
        <div className="current-weather">
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="weather-description">
            {weather.weather[0].description}
            <img 
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
          <div className="weather-details">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </div>
        </div>

        <div className="forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-items">
            {forecast
              .filter((item, index) => index % 8 === 0)
              .slice(0, 5)
              .map((item, index) => (
                <div key={index} className="forecast-item">
                  <div className="forecast-date">
                    {new Date(item.dt * 1000).toLocaleDateString()}
                  </div>
                  <img 
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                  <div className="forecast-temp">
                    {Math.round(item.main.temp)}°C
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;