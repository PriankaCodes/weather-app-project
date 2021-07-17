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
  todaysDate.innerHTML = `${day} I ${date} ${month} @ ${hour}:${minutes}`;
}

function temp(event) {
  event.preventDefault();
  let fMainChange = document.querySelector(".temperature-main");
  let fLowChange = document.querySelector(".temperature-low-main");
  fMainChange.innerHTML = `59°F`;
  fLowChange.innerHTML = `41`;
}

function tempSwitchBack(event) {
  event.preventDefault();
  let cMainChange = document.querySelector("#temperature-main");
  let cLowChange = document.querySelector("#temperature-low-main");
  cMainChange.innerHTML = `15°C`;
  cLowChange.innerHTML = `5`;
}

function showTemperature(response) {
  let city = response.data.name;
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = `${city}`;
  let tempDes = response.data.weather[0].description;
  let weatherType = document.querySelector(".weather-type");
  weatherType.innerHTML = `${tempDes}`;
  let temp = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector(".temperature-main");
  mainTemp.innerHTML = `${temp}°C`;
  let highTemp = Math.round(response.data.main.temp_max);
  let maxTemp = document.querySelector(".temperature-high-main");
  maxTemp.innerHTML = `H:${highTemp}° `;
  let lowTemp = Math.round(response.data.main.temp_min);
  let minTemp = document.querySelector(".temperature-low-main");
  minTemp.innerHTML = `L:${lowTemp}°`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityToday = document.querySelector(".humidity");
  humidityToday.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `Wind: ${wind} km/h`;

  changeImage();

  function changeImage() {
    if (tempDes === `Scattered Clouds`|| tempDes === `Broken Clouds` ) {
      let img = document.querySelector("#main-image");
      img.src = "images/cloudy.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Cloudy skies, with no chance of meatballs.`;
    } else if (tempDes === `Shower Rain` || tempDes === `Rain`) {
      let img = document.querySelector("#main-image");
      img.src = "images/rain.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Rain rain go away, come again another day.`;
    } else if (tempDes === `Clear Sky`) {
      let img = document.querySelector("#main-image");
      img.src = "images/Sunny.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Clear skies, sounds like my kind of day.`;
    } else if (tempDes === `Thunderstorm`) {
      let img = document.querySelector("#main-image");
      img.src = "images/Thunderstorm.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Perhaps Netflix & chill on todays agenda.`;
    } else if (tempDes === `Mist`) {
      let img = document.querySelector("#main-image");
      img.src = "images/cloudy.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Low visibilty - be safe.`;
    } else if (tempDes === `Few Clouds`) {
      let img = document.querySelector("#main-image");
      img.src = "images/partly-cloudy.png";
      let quote = document.querySelector("#quote");
      quote.innerHTML = `Let the Sun out`;
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

search("Japan");

let now = new Date();
today(new Date());

let cities = document.querySelector("#search-city");
cities.addEventListener("submit", searchCity);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", showLocation);

let celciusSwitch = document.querySelector("#celcius-switch");
celciusSwitch.addEventListener("click", tempSwitchBack);

let tempChangeButton = document.querySelector(".temperature-f-change");
tempChangeButton.fontSize = "80%";
tempChangeButton.addEventListener("click", temp);
