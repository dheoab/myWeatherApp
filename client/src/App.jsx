import { useState } from "react";
import "./App.css";
const api = {
  key: "cbec3fdb90ba886899cd76050824d9fc",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    e.preventDefault();
    console.log(query);
    const response = await fetch(
      `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
    );
    console.log(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
    const responseJSON = await response.json();
    console.log(responseJSON);
    setWeather(responseJSON.weather.main);
    setQuery("");
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
      <div className="App">
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
          <div className="weather-box">
            <div className="temp">15°C</div>
            <div className="weather">Sunny</div>
          </div>
          <div className="location-box">
            <div className="location">Jakarta City, Indonesia</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
