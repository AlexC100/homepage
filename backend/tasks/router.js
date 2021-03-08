//initialize express router
let router = require("express").Router();

//set default API response
router.get("/", function (req, res) {
  res.json({
    status: "API Works",
    message: "Welcome to FirstRest API",
  });
});

//Import Task Controller
var taskController = require("./taskController");

// Task routes
router.route("/task").get(taskController.index).post(taskController.add);
router
  .route("/task/:task_id")
  .get(taskController.view)
  .put(taskController.update)
  .delete(taskController.delete);

//Export API routes
module.exports = router;
