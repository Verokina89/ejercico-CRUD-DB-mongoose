const Task = require("../models/Task")

const TaskController = {
  async getAll (req, res) {
    try {
      const getTasks = await Task.find()
      res.status(200).json(getTasks)
    } catch (err) {
      console.error("Lo se ha podido traer todas las tareas: ", err)
    }
  },
  async create (req, res) {
    try {
      const newTask = await Task.create({...req.body, completed: false})
      res.status(201).json(newTask)
    } catch (err) {
      console.error("Lo se ha podido crear la tarea: ", err)
    }
  },
  async getById (req, res) {
    try {
      const idTask = req.params._id
      const task = await Task.findById(idTask)
      res.status(200).json(task)
    } catch (err) {
      console.error("Lo se ha podido traer la tarea: ", err)
    }
  },
  async updateCompleted (req, res) {
    try {
      const idTask = req.params._id
      const task = await Task.findByIdAndUpdate(
        idTask, {
          completed: true
        }, {new: true}
      )
      res.json(task)    
    } catch (err) {
      console.error("Lo se ha podido actualizar la tarea: ", err)
    }
  },
  async deleteById (req, res) {
    try {
      const idTask = req.params._id
      const deletetask = await Task.findByIdAndDelete(idTask)
      res.json({mensaje: "se ha eliminado la tarea:", deletetask})
    } catch (err) {
      console.error("No se ha podido eliminar el elemento: ", err)
    }
  }
}

module.exports = TaskController