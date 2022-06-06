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

// Celsius to Fahrenheit coverter
function convertToFahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");
  // add the active class to celsius link
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Fahrenheit to Celsius converter
function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// function that receives the forecast coordinates
function getForecast(coordinates) {
  let apiKey = "7be1b7858b81bbf663eb3e6f25fa5f88";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  console.log(apiURL);
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
  console.log(forecast);
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
    </div>
    <div id="forecast-highlow">
    <span id="forecast-high">${Math.round(forecastDay.temp.max)}°C</span>
    <span id="forecast-low">
    \u00A0 ${Math.round(forecastDay.temp.min)}°C  </span> 
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
