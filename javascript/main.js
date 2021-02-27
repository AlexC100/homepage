// UI Variables
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const greeting = document.querySelector("#greeting-message");
const name = document.querySelector("#name");
const message = document.querySelector("#message");
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const weather = document.querySelector("#weather");
const quote = document.querySelector("#quote-section");

// Date
// Date variable
const currentDate = new Date();
// Array for days of week
const days = [
  "Duminica",
  "Luni",
  "Marti",
  "Miercuri",
  "Joi",
  "Vineri",
  "Sambata",
];
// Array for months
const months = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

// Show date
function displayDate() {
  date.textContent = `
    ${days[currentDate.getDay()]}, 
    ${currentDate.getDate()} 
    ${months[currentDate.getMonth()]} 
    ${currentDate.getFullYear()}
  `;
}
displayDate();

// Time
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();

  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);

  time.innerHTML = h + ":" + m + ":" + s;

  var t = setTimeout(startTime, 500);

  displayGreeting(h);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}
startTime();

// Show greeting
function displayGreeting(h) {
  if (h >= 2 && h <= 11) {
    greeting.textContent = "Buna dimineata, ";
  } else if (h >= 12 && h <= 18) {
    greeting.textContent = "Buna ziua, ";
  } else {
    greeting.textContent = "Buna seara, ";
  }
}

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
      )}<sup class="sup">o</sup></span>`;
    });
}
getLocation();

const randomNum = Math.floor(Math.random() * 14414);
console.log(randomNum);
// Choose Random Quote
axios
  .get(`/quotes/quotes.json`)
  .then((res) => res.data)
  .catch((err) => console.log(err))
  .then((data) => {
    quote.innerHTML = `<p>${data[randomNum].author}: "<em>${data[randomNum].quote}</em>"</p>`;
  });
