const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);   //ste es el model d la base de datos. el 'Task' sirve para nombrar la  base de datos.

module.exports = Task;


/*
const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
}, { timestamps: true})

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task
*/