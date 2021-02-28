// Import settings.html into index.html
axios
  .get("/imports/settings.html")
  .then((res) => res.data)
  .catch((err) => console.log(err))
  .then((data) => {
    // Assign data to the settings tag
    settings.innerHTML = data;

    // Listen for event listener on click to open window
    openSettings.addEventListener(
      "click",
      () => (settings.style.display = "block")
    );

    // Select exit btns from window
    const donTSaveBtn = document.querySelector("#dont-save-changes");
    const exitSettings = document.querySelector("#exit-settings");

    // Listen for event listener on click on exit btn to close window
    exitSettings.addEventListener(
      "click",
      () => (settings.style.display = "none")
    );

    // Listen for event listener on click on don't save button to close window
    donTSaveBtn.addEventListener(
      "click",
      () => (settings.style.display = "none")
    );

    // Listen for event listener on click outside popup window to close
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("container")) {
        settings.style.display = "none";
      }
    });
  });
