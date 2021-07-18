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
  fMaxChange.innerHTML = `H:${Math.round(fahrenheitTempMax)}° `;
  fLowChange.innerHTML = `L:${Math.round(fahrenheitTempMin)}°`;
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
  cMaxChange.innerHTML = `H:${Math.round(celcuisTempMax)}° `;
  cLowChange.innerHTML = `L:${Math.round(celcuisTempMin)}°`;
  cWind.innerHTML = `Wind: ${Math.round(windElement)} km/h`;
}

function showTemperature(response) {
  celcuisTempMain = response.data.main.temp;
  celcuisTempMax = response.data.main.temp_max;
  celcuisTempMin = response.data.main.temp_min;
  windElement = response.data.wind.speed;
  let city = response.data.name;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = `${city}`;
  let tempDes = response.data.weather[0].description;
  let weatherType = document.querySelector(".weather-type");
  weatherType.innerHTML = `${tempDes}`;
  let temp = Math.round(celcuisTempMain);
  let mainTemp = document.querySelector(".temperature-main");
  mainTemp.innerHTML = `${temp}°C`;
  let highTemp = Math.round(celcuisTempMax);
  let maxTemp = document.querySelector(".temperature-high-main");
  maxTemp.innerHTML = `H:${highTemp}° `;
  let lowTemp = Math.round(celcuisTempMin);
  let minTemp = document.querySelector(".temperature-low-main");
  minTemp.innerHTML = `L:${lowTemp}°`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityToday = document.querySelector(".humidity");
  humidityToday.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(windElement);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;

  changeImage();

  function changeImage() {
    if (tempDes === `scattered clouds` || tempDes === `broken clouds`) {
      let img = document.querySelector("#main-image");
      img.src = "images/scattered-clouds.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Cloudy skies, with no chance of meatballs.`;
    } else if (
      tempDes === `shower rain` ||
      tempDes === `rain` ||
      tempDes === `light rain` ||
      tempDes === `moderate rain` ||
      tempDes === `heavy intensity rain` ||
      tempDes === `very heavy rain` ||
      tempDes === `extreme rain` ||
      tempDes === `light intensity shower rain` ||
      tempDes === `heavy intensity shower rain` ||
      tempDes === `ragged shower rain` ||
      tempDes === `light intensity drizzle` ||
      tempDes === `drizzle` ||
      tempDes === `drizzle rain` ||
      tempDes === `heavy intensity drizzle rain` ||
      tempDes === `shower rain and drizzle` ||
      tempDes === `heavy shower rain and drizzle` ||
      tempDes === `shower drizzle`
    ) {
      let img = document.querySelector("#main-image");
      img.src = "images/rain.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Rain rain go away, come again another day.`;
    } else if (tempDes === `clear sky`) {
      let img = document.querySelector("#main-image");
      img.src = "images/clear-day.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Clear skies, sounds like my kind of day.`;
    } else if (
      tempDes === `thunderstorm` ||
      tempDes === `thunderstorm with light rain` ||
      tempDes === `thunderstorm with rain` ||
      tempDes === `thunderstorm with heavy rain` ||
      tempDes === `light thunderstorm` ||
      tempDes === `heavy thunderstorm` ||
      tempDes === `ragged thunderstorm` ||
      tempDes === `thunderstorm with light drizzle` ||
      tempDes === `thunderstorm with drizzle` ||
      tempDes === `thunderstorm with heavy drizzle`
    ) {
      let img = document.querySelector("#main-image");
      img.src = "images/thunderstorms.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Perhaps Netflix & chill on todays agenda.`;
    } else if (
      tempDes === `mist` ||
      tempDes === `smoke` ||
      tempDes === `haze` ||
      tempDes === `sand/ dust whirls` ||
      tempDes === `fog` ||
      tempDes === `dust` ||
      tempDes === `volcanic ash` ||
      tempDes === `squalls` ||
      tempDes === `tornado` ||
      tempDes === `sand`
    ) {
      let img = document.querySelector("#main-image");
      img.src = "images/atmosphere.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Low visibilty - be safe.`;
    } else if (tempDes === `few clouds`) {
      let img = document.querySelector("#main-image");
      img.src = "images/partly-cloudy.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Let the Sun out`;
    } else if (tempDes === `overcast clouds`) {
      let img = document.querySelector("#main-image");
      img.src = "images/clouds.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Let the Sun out`;
    } else if (
      tempDes === `light snow` ||
      tempDes === `snow` ||
      tempDes === `heavy snow` ||
      tempDes === `sleet` ||
      tempDes === `light shower sleet` ||
      tempDes === `shower sleet` ||
      tempDes === `light rain and snow` ||
      tempDes === `rain and snow` ||
      tempDes === `light shower snow` ||
      tempDes === `shower snow` ||
      tempDes === `heavy shower snow` ||
      tempDes === `freezing rain`
    ) {
      let img = document.querySelector("#main-image");
      img.src = "images/snow.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Low visibilty - take care.`;
    }
  }
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<ul class="forecast-main">`;
  let days = ["S", "M", "T", "W", "Th"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `   
          <li class="forecast-1">
            <span class="day-m" id="tomorrow">${day}</span>
            <img src="images/clear-day.png" width="70" alt="Sunshine" />
            <ul class="forecast">
              <li class="temperature-high">15°C</li>
              <li class="temperature-low">4°C</li>
            </ul>
          </li>`;
  });
  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
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
displayForecast();

today(new Date());
