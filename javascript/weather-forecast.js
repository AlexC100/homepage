axios
  .get("../imports/weather-forecast.html")
  .then((res) => res.data)
  .catch((err) => console.log(err))
  .then((data) => {
    weatherForecast.innerHTML = data;

    const forecastSection = document.querySelector(".forecast-section");
    // Listen for click on weather section to show card
    weather.addEventListener("click", () => {
      weatherForecast.style.display = "block";
    });

    // Listen for click on card to hide it
    weatherForecast.addEventListener("click", () => {
      weatherForecast.style.display = "none";
    });

    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("container")) {
        weatherForecast.style.display = "none";
      }
    });

    // Location with Geolocation API
    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    function showPosition(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    }

    // UI Card Variables
    const icon = document.querySelector(".icon");
    const temp = document.querySelector(".temp");
    const feelsLike = document.querySelector(".feels-like");
    const maxTemp = document.querySelector(".max-temp");
    const minTemp = document.querySelector(".min-temp");
    const windSpeed = document.querySelector(".wind-speed");
    const humidity = document.querySelector(".humidity");
    const pressure = document.querySelector(".presure");

    // Weather with Open Weather Map API
    function getWeather(lat, lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=1dc0c6d8ffc55f7d946aadc4ff47209b`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err))
        .then((data) => {
          city.innerHTML = `${data.name},`;
          country.innerHTML = data.sys.country;
          weather.innerHTML += `<img id="weather-icon" src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
          }.png"> <span>${Math.round(
            data.main.temp
          )}<sup class="sup">o</sup></span> C`;

          icon.innerHTML = `<img id="card-weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`;
          temp.innerHTML = `${Math.round(
            data.main.temp
          )}<sup class="sup">o</sup> C`;

          feelsLike.innerHTML = `Se simte ca la: ${Math.round(
            data.main.feels_like
          )}<sup class="sup">o</sup> C`;

          maxTemp.innerHTML = `Temperatura maxima: ${Math.round(
            data.main.temp_max
          )}<sup class="sup">o</sup> C`;

          minTemp.innerHTML = `Temperatura minima: ${Math.round(
            data.main.temp_min
          )}<sup class="sup">o</sup> C`;

          pressure.innerHTML = `Presiune atmosferica: ${data.main.pressure} mmHg`;

          humidity.innerHTML = `Umiditate: ${data.main.humidity} %`;

          windSpeed.innerHTML = `Viteza vantului: ${
            (data.wind.speed * 60) / 1000
          } km/s`;
        });
    }
    getLocation();
  });
