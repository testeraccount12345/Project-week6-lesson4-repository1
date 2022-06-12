// Return the formatted date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

// Format the API Key, units, API URL
function search(city) {
  let apiKey = "7be1b7858b81bbf663eb3e6f25fa5f88";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}

// Receive city from search form
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-submitted").value;
  search(city);
}

// Listen for "click" on search form
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// function that receives the forecast coordinates
function getForecast(coordinates) {
  let apiKey = "7be1b7858b81bbf663eb3e6f25fa5f88";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(displayForecast);
}

// Update information on webpage by ID
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  // document.querySelector("#temperature").innerHTML =
  //   Math.round("celsiusTemperature");
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

// convert the JS forecast date to customized date
function formatDateForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

// looping weatherforecast function
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2" id="forecast-border">
  <div>
  <span id="forecast-days">
    ${formatDateForecast(forecastDay.dt)}</span></div>
    <div>
    
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" id="forecast-icon" />
      <span id="forecast-description">${forecastDay.weather[0].main}</span> 

    
    </div>
    <div id="forecast-highlow">
    <span id="forecast-high">${Math.round(forecastDay.temp.max)}°C</span>
    <span id="forecast-low">${Math.round(forecastDay.temp.min)}°C</span> 
 
    </div>
  </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("Barcelona");
displayForecast();
