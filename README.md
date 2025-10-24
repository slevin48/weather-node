# Weather App

This is a modern React weather application that displays current weather conditions and a 5-day forecast.

## Features

- Current weather display including:
  - Temperature
  - Weather conditions
  - Humidity
  - Wind speed
- 5-day weather forecast
- Clean and responsive design
- Real-time weather data from OpenWeather API

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a free account at [OpenWeather](https://openweathermap.org/) and get an API key
4. Replace `YOUR_API_KEY` in `src/App.js` with your actual API key
5. Start the development server:
   ```bash
   npm start
   ```

## Dependencies

- React
- axios
- OpenWeather API

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## Customization

You can customize the default city by changing the `CITY` constant in `src/App.js`.