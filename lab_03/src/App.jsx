import { useEffect, useState } from 'react';
import { fetchWeather } from './api/fetchWeather.js';
import './App.css';
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const search = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // puste pole - nic nie robimy
    setLoading(true);
    setError('');
    try {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery(''); // czyścimy pole po udanym wyszukiwaniu
    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-container">
      <form onSubmit={search}>
        <input
          type="text"
          className="search"
          placeholder="Wpisz miasto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {loading && <p className="message">Pobieranie danych...</p>}
      {error && <p className="message error">Błąd: {error}</p>}
      {!online && (
        <p className="message" role="status">
          Brak połączenia{weather ? ' - pokazuję ostatnio pobrane dane.' : '.'}
        </p>
      )}
      {weather && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">{Math.round(weather.main.temp)}°C</div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
          <p>&nbsp;</p>
          <p>Ciśnienie atmosferyczne: {weather.main.pressure} hPa</p>
          <p>Wilgotność: {weather.main.humidity}%</p>
          <p>Prędkość wiatru: {weather.wind.speed} m/s</p>
          {weather.wind.gust != null && (
            <p>Porywy wiatru: {weather.wind.gust} m/s</p>
          )}
          <p>Kierunek wiatru: {weather.wind.deg}°</p>
          <p>&nbsp;</p>
          <p>Godzina pomiaru: {new Date(weather.dt * 1000).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      )}
    </div>
  );
}
export default App;
