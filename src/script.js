function search(city) {
  let units = `metric`;
  let apiKey = `4cd86623af1218163bcbc915f42833d3`;
  let apiEnd = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEnd}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  if (apiUrl === undefined) {
    alert(`Please enter a City Name`);
  }
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  search(cityName.value);
}

function today() {
  let now = new Date();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let months = [
    `January`,
    `Feburary`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let todaysDate = document.querySelector("#today");
  todaysDate.innerHTML = `${day}, ${date} ${month} @ ${hour}:${minutes}`;
}

function displayFTemp(event) {
  event.preventDefault();
  celciusSwitch.classList.remove("active");
  fahrenheitSwitch.classList.add("active");
  let fahrenheitTempMain = (celcuisTempMain * 9) / 5 + 32;
  let fahrenheitTempMax = (celcuisTempMax * 9) / 5 + 32;
  let fahrenheitTempMin = (celcuisTempMin * 9) / 5 + 32;
  let fahrenehitWind = (windElement * 9) / 5 + 32;
  let fMainChange = document.querySelector("#temperature-main");
  let fMaxChange = document.querySelector("#temperature-high-main");
  let fLowChange = document.querySelector("#temperature-low-main");
  let fWind = document.querySelector(".wind");
  fMainChange.innerHTML = `${Math.round(fahrenheitTempMain)}°F`;
  fMaxChange.innerHTML = `${Math.round(fahrenheitTempMax)}° `;
  fLowChange.innerHTML = `${Math.round(fahrenheitTempMin)}°`;
  fWind.innerHTML = `Wind: ${Math.round(fahrenehitWind)} m/h`;
}

function tempSwitchBack(event) {
  event.preventDefault();
  celciusSwitch.classList.add("active");
  fahrenheitSwitch.classList.remove("active");
  let cMainChange = document.querySelector("#temperature-main");
  let cMaxChange = document.querySelector("#temperature-high-main");
  let cLowChange = document.querySelector("#temperature-low-main");
  let cWind = document.querySelector(".wind");
  cMainChange.innerHTML = `${Math.round(celcuisTempMain)}°C`;
  cMaxChange.innerHTML = `${Math.round(celcuisTempMax)}° `;
  cLowChange.innerHTML = `${Math.round(celcuisTempMin)}°`;
  cWind.innerHTML = `Wind: ${Math.round(windElement)} km/h`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [`S`, `M`, `T`, `W`, `Th`, `F`, `S`];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul class="forecast-main">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      let changeImage = changeImageForecast(forecastDay.weather[0].icon);
      forecastHTML =
        forecastHTML +
        `   
          <li class="forecast-day">
            <span class="day-m">${formatDay(forecastDay.dt)}</span>
            <img src=${changeImage} id="change-image" width="70" alt="Sunshine" />
            <ul class="forecast">
              <li class="temperature-high">${Math.round(
                forecastDay.temp.max
              )}°C</li>
              <li class="temperature-low">${Math.round(
                forecastDay.temp.min
              )}°C</li>
            </ul>
          </li>`;
    }
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;

  function changeImageForecast(icon) {
    if (icon === `03d` || icon === `03n` || icon === `04d` || icon === `04n`) {
      return "images/scattered-clouds.png";
    } else if (
      icon === `09d` ||
      icon === `09n` ||
      icon === `10d` ||
      icon === `10n`
    ) {
      return "images/rain.png";
    } else if (icon === `01d`) {
      return "images/clear-day.png";
    } else if (icon === `01n` || icon === `04n`) {
      return "images/clear-night.png";
    } else if (icon === `11d` || icon === `11n`) {
      return "images/thunderstorms.png";
    } else if (icon === `50d` || icon === `50n`) {
      return "images/atmosphere.png";
    } else if (icon === `02d` || icon === `02n`) {
      return "images/partly-cloudy.png";
    } else if (icon === `04d`) {
      return "images/clouds.png";
    } else if (icon === `13d` || icon === `13n`) {
      return "images/snow.png";
    }
  }
}

function getForecast(coordinates) {
  let units = `metric`;
  let apiKey = `4cd86623af1218163bcbc915f42833d3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);
  celcuisTempMain = response.data.main.temp;
  celcuisTempMax = response.data.main.temp_max;
  celcuisTempMin = response.data.main.temp_min;
  windElement = response.data.wind.speed;
  let weatherIcon = response.data.weather[0].icon;
  let city = response.data.name;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = `${city}`;
  let icon = response.data.weather[0].description;
  let weatherType = document.querySelector(".weather-type");
  weatherType.innerHTML = `${icon}`;
  let temp = Math.round(celcuisTempMain);
  let mainTemp = document.querySelector(".temperature-main");
  mainTemp.innerHTML = `${temp}°C`;
  let highTemp = Math.round(celcuisTempMax);
  let maxTemp = document.querySelector(".temperature-high-main");
  maxTemp.innerHTML = `${highTemp}° `;
  let lowTemp = Math.round(celcuisTempMin);
  let minTemp = document.querySelector(".temperature-low-main");
  minTemp.innerHTML = `${lowTemp}°`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityToday = document.querySelector(".humidity");
  humidityToday.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(windElement);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;

  getForecast(response.data.coord);

  changeImage(weatherIcon);

  function changeImage(icon) {
    if (icon === `03d` || icon === `03n` || icon === `04d` || icon === `04n`) {
      let img = document.querySelector("#main-image");
      img.src = "images/scattered-clouds.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Cloudy skies, with no chance of meatballs.`;
    } else if (
      icon === `09d` ||
      icon === `09n` ||
      icon === `10d` ||
      icon === `10n`
    ) {
      let img = document.querySelector("#main-image");
      img.src = "images/rain.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Rain rain go away, come again another day.`;
    } else if (icon === `01d`) {
      let img = document.querySelector("#main-image");
      img.src = "images/clear-day.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Clear skies, sounds like my kind of day.`;
    } else if (icon === `01n` || icon === `02n` || icon === `04n`) {
      let img = document.querySelector("#main-image");
      img.src = "images/clear-night.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Clear skies, sounds like my kind of night.`;
    } else if (icon === `11d` || icon === `11n`) {
      let img = document.querySelector("#main-image");
      img.src = "images/thunderstorms.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Perhaps Netflix & chill on todays agenda.`;
    } else if (icon === `50d` || icon === `50n`) {
      let img = document.querySelector("#main-image");
      img.src = "images/atmosphere.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Today I jumped at the fog, but I mist`;
    } else if (icon === `02d`) {
      let img = document.querySelector("#main-image");
      img.src = "images/partly-cloudy.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Tomorrow, tomorrow, the Sun will come out tomorrow (hopefully)`;
    } else if (icon === `04d`) {
      let img = document.querySelector("#main-image");
      img.src = "images/clouds.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `I am trying to think of a weather pun, but my mind is kinda cloudy`;
    } else if (icon === `13d` || icon === `13n`) {
      let img = document.querySelector("#main-image");
      img.src = "images/snow.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Do you wanna build a Snow Man?`;
    }
  }
}

function showPosition(position) {
  let loc = position.coords;
  let longitude = loc.longitude.toFixed(2);
  let latitude = loc.latitude.toFixed(2);
  let units = `metric`;
  let apiKey = `4cd86623af1218163bcbc915f42833d3`;
  let apiEnd = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEnd}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let celcuisTempMain = null;
let celcuisTempMax = null;
let celcuisTempMin = null;
let windElement = null;

let cities = document.querySelector("#search-city");
cities.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", showLocation);

let celciusSwitch = document.querySelector("#celcius-switch");
celciusSwitch.addEventListener("click", tempSwitchBack);

let fahrenheitSwitch = document.querySelector("#fahrenheit-switch");
fahrenheitSwitch.fontSize = "80%";
fahrenheitSwitch.addEventListener("click", displayFTemp);

search("Japan");

today(new Date());
