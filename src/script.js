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
  console.log(apiURL);
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

//function convertToFahrenheit(event) {
//  event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//let temperature = temperatureElement.innerHTML;
//temperatureElement.innerHTML = Math.round(temperature * 9) / 5 + 32
//}

//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Fahrenheit to Celsius converter
//function convertToCelsius(event) {
//  let temperatureElement = document.querySelector("#temperature");
//temperature = temperatureElement.innerHTML;
//temperatureElement.innerHTML = Math.round(temperature - 32) * (5/9)
//}

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

// city weather search engine

// Update information on webpage by ID
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
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
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}

search("Barcelona");
