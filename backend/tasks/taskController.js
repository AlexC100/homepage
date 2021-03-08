//Import Task Model
Task = require("./taskModel");

//For index
exports.index = function (req, res) {
  Task.get(function (err, task) {
    if (err)
      res.json({
        status: "error",
        message: err,
      });
    res.json({
      status: "success",
      message: "Got Task Successfully!",
      data: task,
    });
  });
};

//For creating new Task
exports.add = function (req, res) {
  console.log(req.body);
  var task = new Task();
  task.title = req.body.title;
  task.description = req.body.description;
  task.dueDate = req.body.dueDate;
  task.tag = req.body.tag;
  task.priority = req.body.priority;

  //Save and check error
  task.save(function (err) {
    if (err) res.json(err);
    res.json({
      message: "New Task Added!",
      data: task,
    });
  });
};

// View Task
exports.view = function (req, res) {
  Task.findById(req.params.task_id, function (err, task) {
    if (err) res.send(err);
    res.json({
      message: "Task Details",
      data: task,
    });
  });
};

// Update Task
exports.update = function (req, res) {
  Task.findById(req.params.task_id, function (err, task) {
    if (err) res.send(err);

    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = req.body.dueDate;
    task.tag = req.body.tag;
    task.priority = req.body.priority;

    //save and check errors
    task.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "Task Updated Successfully",
        data: task,
      });
    });
  });
};

// Delete Task
exports.delete = function (req, res) {
  Task.deleteOne(
    {
      _id: req.params.task_id,
    },
    function (err, contact) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "Task Deleted",
      });
    }
  );
};
