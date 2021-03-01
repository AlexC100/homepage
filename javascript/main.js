// Generate random number
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
