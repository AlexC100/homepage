// Import tasks.html into index.html
axios
  .get("/imports/tasks.html")
  .then((res) => res.data)
  .catch((err) => console.log(err))
  .then((data) => {
    // Assign data to the list tag
    taskList.innerHTML = data;

    // Listen for event listener on click to open task list app
    openTaskList.addEventListener("click", () => {
      taskList.style.display = "block";
    });

    // Select exit btn from tasks window
    const exitTasks = document.querySelector("#exit-tasks");

    // Listen for event listener on click on don't save button to close settings
    exitTasks.addEventListener("click", () => {
      taskList.style.display = "none";
    });

    // Listen for event listener on click outside popup window to close
    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("container")) {
        taskList.style.display = "none";
      }
    });
  });
