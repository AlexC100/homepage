// Ui Variables
const openSettings = document.querySelector("#settings-gear");
const closeSettings = document.querySelector("#exit");
const settingsWindow = document.querySelector("#settings-window");
const popup = document.querySelector(".popup");
const donTSaveBtn = document.querySelector("#dont-save-changes");

// Listen for event listener on click to open
openSettings.addEventListener("click", () => {
  settingsWindow.style.display = "block";
  popup.style.display = "block";
});

// Listen for event listener on click to close
closeSettings.addEventListener(
  "click",
  () => (settingsWindow.style.display = "none")
);

// Listen for event listener on click outside popup window to close
popup.addEventListener("click", function (e) {
  if (e.target.classList.contains("popup")) {
    settingsWindow.style.display = "none";
  }
});

// Listen for event listener on click on don't save button to close
donTSaveBtn.addEventListener(
  "click",
  () => (settingsWindow.style.display = "none")
);
