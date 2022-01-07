import React, { useState } from 'react';
import './App.css';
const api = process.env.REACT_APP_MY_KEY
function App() {
  const [query, setQuery] = useState('');
  const [weathers, setWeather] = useState({});

  const search = () => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${api}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    
  }
  let date = new Date();
  let emoji = null;
  if (typeof weathers.main != "undefined") {
    if (weathers.weather[0].main === "Clouds") {
      emoji = "bx bxs-cloud bx-flashing";
    } else if (weathers.weather[0].main === "Thunderstorm") {
      emoji = "bx bxs-cloud-lightning bx-tada";
    } else if (weathers.weather[0].main === "Drizzle") {
      emoji = "fas fa-cloud-rain";
    } else if (weathers.weather[0].main === "Rain") {
      emoji = date.getHours() < 6 & date.getHours() > 19 ? "fas fa-cloud-sun-rain" : "fas fa-cloud-moon-rain";
    } else if (weathers.weather[0].main === "Snow") {
      emoji = "far fa-snowflake";
    } else if (weathers.weather[0].main === "Clear") {
      emoji = date.getHours() > 6 & date.getHours() < 19 ? "bx bxs-sun bx-spin" : "bx bxs-moon";
    } else {
      emoji = "fas fa-smog";
    }
  }

  return (

    <div>
      <main>
        <div className="search-box fixed-top m-auto">
          <form className='d-flex' >
            <input
              type="text"
              className="search-bar m-0"
              placeholder="Search here by City Name...."
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
            <button
              type="button"
              id="basic-addon2"
              onClick={search}
              className='p-0 m-0'
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
        <div className="row justify-content-center h-100 main-container" >
          <div className="col-md-4 inner">
            {typeof weathers.main != "undefined" ? (
              <div className="card text-white text-center border-0">
                <img
                  src={`https://source.unsplash.com/600x900/?${weathers.weather[0].description}`}
                  className="card-img"
                  alt="..."
                />
                <div className="card-img-overlay">

                  <div className="bg-dark bg-opacity-50 py-3">
                    <h2 className="card-title">
                      {weathers.name} , {weathers.sys.country}
                    </h2>
                    <p className="card-text lead m-0">{date.toDateString()}</p>
                    <hr></hr>
                    <div>
                      <p className="lead m-0"> Max <span className="px-2">{Math.round(weathers.main.temp_max)}&deg;C</span>|  Min <span className="px-2"> {Math.round(weathers.main.temp_min)}&deg;C</span></p>
                      <i className={emoji} style={{ fontSize: "6rem" }}></i>
                      <h1 className="fw-bolder mb-2">
                        {Math.round(weathers.main.temp)}&deg;C
                      </h1>
                    </div>
                    <h3>{weathers.weather[0].main}</h3>
                    <p className="lead m-0"> Description : {weathers.weather[0].description}</p>
                    <h5 className="my-2 hum">Humidity :  {Math.round(weathers.main.humidity)} % | Pressure :{Math.round(weathers.main.pressure)} hPa</h5>
                    <h3>Wind</h3>
                    <p>Deg : {weathers.wind.deg} | Speed: {Math.round(weathers.wind.speed)} m/s | Gust: {Math.round(weathers.wind.gust)} m/s</p>
                  </div>

                </div>
              </div>
            ) : (<h1 className='main-heading'>Enter the data above to see weather of different cities across the world</h1>)}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;