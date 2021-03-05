// UI Variables
const container = document.querySelector(".container");
// Date and time
const date = document.querySelector("#date");
const time = document.querySelector("#time");
// Greeting
const greeting = document.querySelector("#greeting-message");
const name = document.querySelector("#name");
const quote = document.querySelector("#quote-section");
// Popup window
const popupWindow = document.querySelector(".popup-window");
// Settings
const settings = document.querySelector("#settings");
const openSettings = document.querySelector("#settings-gear");
const donTSaveBtn = document.querySelector("#dont-save-changes");
const exitSettings = document.querySelector("#exit-settings");
// Task list
const taskListWindow = document.querySelector("#task-list-window");
const openTaskList = document.querySelector("#task-list-app");
// UI Variables
const exitTasks = document.querySelector("#exit-tasks");
const newTaskTitle = document.querySelector("#new-task-title");
const newTaskDescription = document.querySelector("#new-task-description");
const tagSelect = document.querySelector("#task-tags");
const prioritySelect = document.querySelector("#task-priorities");
const taskDue = document.querySelector("#task-due-date");
const submitNewTaskBtn = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const deleteTask = document.querySelector(".delete-task");
// Location and weather
const city = document.querySelector("#city");
const country = document.querySelector("#country");
const weather = document.querySelector("#weather");
const weatherForecast = document.querySelector("#weather-forecast-card");
const forecastSection = document.querySelector(".forecast-section");
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels-like");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const pressure = document.querySelector(".presure");
// Notes
const notesApp = document.querySelector("#notes-app");
const notesIcon = document.querySelector("#notes-app-icon");
const exitNotes = document.querySelector("#exit-notes");

////////////////////////////////////////////////////////////////
//////////////////// Time Date and Greeting ////////////////////
////////////////////////////////////////////////////////////////

// Generate random number for quotes
const randomNum = Math.floor(Math.random() * 14414);
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
// Get quote
// Choose Random Quote
axios
  .get(`/quotes/quotes.json`)
  .then((res) => res.data)
  .catch((err) => console.log(err))
  .then((data) => {
    quote.innerHTML = `<p>${data[randomNum].author}: "<em>${data[randomNum].quote}</em>"</p>`;
  });

//////////////////////////////////////////////////////////////
//////////////////// Weather and Location ////////////////////
//////////////////////////////////////////////////////////////

// Listen for click on weather section to show card
weather.addEventListener("click", () => {
  weatherForecast.style.display = "block";
});

// Listen for click on card to hide it
weatherForecast.addEventListener("click", () => {
  weatherForecast.style.display = "none";
});

// Listen for click outside window to close it
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

// Get the Weather from the API and display it
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

      windSpeed.innerHTML = `Viteza vantului: ${(
        (data.wind.speed * 60) /
        1000
      ).toFixed(2)} km/s`;
    });
}
getLocation();

///////////////////////////////////////////////////////
//////////////////// Task List App ////////////////////
///////////////////////////////////////////////////////

let taskDb = [];
// Create new task
function createTask(title, description, tag, priority, due) {
  newTaskObject = {
    taskTitle: title,
    taskDue: due,
    taskPriority: priority,
    taskTag: tag,
    taskDescription: description,
  };

  taskDb.push(newTaskObject);

  taskList.innerHTML += `
      <div class="task input-field content-2-cols">
      <div class="content-2-rows main-task-section">
        <p class="task-title" contenteditable="true" areamultiline="false">${title}</p>
        <div class="content-2-rows task-info-and-delete">
          <p class="task-info-group"><span class="due-date mx5">${due}</span> <span class="task-priority mx5">${priority}</span> <span class="tag mx5">${tag}</span></p>
          <a href="#" class="link text-secondary mx5 delete-task"><i class="fas fa-trash"></i></a>
        </div>
      </div>
      <p class="task-description input-field" contenteditable="true">${description}</p>
    </div>
  `;
}

window.addEventListener("onload", () => {
  let output = "";
  taskDb.forEach((task) => {
    output += `
      <div class="task input-field content-2-cols">
        <div class="content-2-rows main-task-section">
          <p class="task-title" contenteditable="true" areamultiline="false">${task.taskTitle}</p>
          <div class="content-2-rows task-info-and-delete">
            <p class="task-info-group"><span class="due-date mx5">${task.taskDue}</span> <span class="task-priority mx5">${task.taskPriority}</span> <span class="tag mx5">${task.taskTag}</span></p>
            <a href="#" class="link text-secondary mx5 delete-task"><i class="fas fa-trash"></i></a>
          </div>
        </div>
        <p class="task-description input-field" contenteditable="true">${task.taskDescription}</p>
      </div>
    `;
  });

  taskList.innerHTML = output;
});

// Listen for event listener on click to open task list app
openTaskList.addEventListener("click", () => {
  taskListWindow.style.display = "block";
});

// Listen for event listener on click on don't save button to close settings
exitTasks.addEventListener("click", () => {
  taskListWindow.style.display = "none";
});

// Listen for event listener on click outside popup window to close
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("container")) {
    taskListWindow.style.display = "none";
  }
});

// Listen for click event listener to add new task
submitNewTaskBtn.addEventListener("click", (e) => {
  createTask(
    newTaskTitle.value,
    newTaskDescription.value,
    tagSelect.value,
    prioritySelect.value,
    taskDue.value
  );
  e.preventDefault();
});

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    console.log(e.target);
    e.target.parentElement.parentElement.parentElement.remove();
  }
});

//////////////////////////////////////////////////
//////////////////// Settings ////////////////////
//////////////////////////////////////////////////

// Listen for event listener on click to open window
openSettings.addEventListener(
  "click",
  () => (settings.style.display = "block")
);

// Listen for event listener on click on exit btn to close window
exitSettings.addEventListener("click", () => (settings.style.display = "none"));

// Listen for event listener on click on don't save button to close window
donTSaveBtn.addEventListener("click", () => (settings.style.display = "none"));

// Listen for event listener on click outside popup window to close
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("container")) {
    settings.style.display = "none";
  }
});

///////////////////////////////////////////////////
//////////////////// Notes App ////////////////////
///////////////////////////////////////////////////

// Listen for event listener on click to open window
notesIcon.addEventListener("click", () => {
  notesApp.setAttribute("style", "display: block");
});

// Listen for event listener on click on exit btn to close window
exitNotes.addEventListener("click", () =>
  notesApp.setAttribute("style", "display: none")
);

// Listen for event listener on click outside popup window to close
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("container")) {
    notesApp.setAttribute("style", "display: none");
  }
});
