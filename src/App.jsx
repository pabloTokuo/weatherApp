import './app.css';
import { useState } from 'react';
import AirIcon from '@mui/icons-material/Air';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';

const api = {
  key: '',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  async function search(e) {
    if (e.key === 'Enter') {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`,
      );
      const data = await response.json();
      setWeather(data);
      setQuery('');
      console.log(data);
    }
  }

  const dates = new Date();
  let month = months[dates.getMonth()];
  let day = days[dates.getDay()];

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  return (
    <div className="container">
      <div
        className={
          typeof weather.main != 'undefined'
            ? weather.main.temp > 16
              ? 'weather-box weather-cloud'
              : 'weather-box weather-rainy'
            : 'weather-box'
        }
      >
        <div className="weather-day">
          <p>
            <b>
              {dates.getDate()} {month},
            </b>{' '}
            {day}
          </p>
        </div>
        <input
          type="text"
          className="weather-input"
          placeholder="Search City..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={search}
        />
        {typeof weather.main != 'undefined' ? (
          <>
            <h1>{Math.round(weather.main.temp)}ºC</h1>
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
          </>
        ) : (
          ''
        )}
        <p className="weather-message">{weather.message}</p>
      </div>
      <div className="weather-infos">
        <div className="weather-cards">
          <ul>
            <li>
              <AirIcon />
            </li>
            <li>Wind</li>
            <li>
              {typeof weather.wind != 'undefined'
                ? `${Math.round(weather.wind.speed)} km/h`
                : ''}
            </li>
          </ul>
        </div>
        <div className="weather-cards">
          <ul>
            <li>
              <ThermostatIcon />
            </li>
            <li>Pressure</li>
            <li>
              {typeof weather.main != 'undefined'
                ? `${weather.main.pressure} MB`
                : ''}
            </li>
          </ul>
        </div>
        <div className="weather-cards">
          <ul>
            <li>
              <OpacityIcon />
            </li>
            <li>Humidity</li>
            <li>
              {typeof weather.main != 'undefined'
                ? `${weather.main.humidity}%`
                : ''}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
