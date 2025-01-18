function updateWeatherDetails(response) {
  let temperatureCurrent = document.querySelector("#temperature");
  let temperature = (response.data.temperature.current);
  let cityCurrent = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
 

  cityCurrent.innerHTML = (response.data.city);
  descriptionElement.innerHTML = (response.data.condition.description);
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  temperatureCurrent.innerHTML = Math.round(temperature);
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="current-temperature-icon">`;
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (hours < 10) {
      hours = `0${hours}`;
    }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "355o03d48211t632342b7f4c029b7a0f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherDetails);
}

function searchSubmit(event) {
   event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);

  console.log(searchCity);

}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);

searchCity("Knoxville");
