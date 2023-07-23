import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
const api = {
  key: "cbec3fdb90ba886899cd76050824d9fc",
  base: "https://api.openweathermap.org/data/2.5/",
  img: "https://openweathermap.org/img/wn/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const fetchData = async (city) => {
    try {
      console.log(query, "ini Query");
      const { data } = await axios.get(
        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
      );
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.log(error, "ini Error");
    }
  };

  useEffect(() => {
    fetchData("Jakarta");
  }, []);

  const search = async (e) => {
    e.preventDefault();

    if (!query) {
      return;
    }

    fetchData(query);
  };

  const dateBuilder = (d) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <>
      <div
        className={
          Object.keys(weather).length != 0
            ? weather.main.temp > 24
              ? "App warm"
              : "App"
            : "App"
        }
      >
        <main>
          <div className="search-box">
            <form action="" className="search-form" onSubmit={search}>
              <div className="search-stack">
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search City..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <button type="submit" className="search-button">
                  <ion-icon name="search-sharp"></ion-icon>
                </button>
              </div>
            </form>
          </div>
          {Object.keys(weather).length != 0 ? (
            <div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div>
                  <img src={`${api.img}${weather.weather[0].icon}@2x.png`} />
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <div style={{ display: "inline-block" }}>
                  <div className="humidity" style={{ display: "inline-block" }}>
                    <ion-icon name="water-sharp"></ion-icon>{" "}
                    {weather.main.humidity}%
                  </div>
                  <div
                    className="wind"
                    style={{ display: "inline-block", marginLeft: "50px" }}
                  >
                    <ion-icon name="leaf-sharp"></ion-icon>{" "}
                    {Math.round(weather.wind.speed)} m/s
                  </div>
                </div>
              </div>
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
            </div>
          ) : (
            "FETCHING"
          )}
        </main>
      </div>
    </>
  );
}

export default App;
