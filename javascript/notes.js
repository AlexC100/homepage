axios
  .get("/imports/notes.html")
  .then((res) => res.data)
  .catch((err) => console.log(err))
  .then((data) => {
    notesApp.innerHTML = data;

    notesIcon.addEventListener("click", () => {
      notesApp.setAttribute("style", "display: block");
    });

    const exitNotes = document.querySelector("#exit-notes");
    exitNotes.addEventListener("click", () =>
      notesApp.setAttribute("style", "display: none")
    );

    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("container")) {
        notesApp.setAttribute("style", "display: none");
      }
    });
  });
