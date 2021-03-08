var mongoose = require("mongoose");

//schema
var taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: String,
    required: false,
  },
  tag: {
    type: String,
    required: false,
  },
  priority: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Export Bio Model
var Task = (module.exports = mongoose.model("task", taskSchema));

module.exports.get = function (callback, limit) {
  Task.find(callback).limit(limit);
};
