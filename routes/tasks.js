const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

//Middleware Create tarea
router.post('/create', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get tarea by Id
router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// mark task as complete. (este PUT que marcar la tarea completada,  actualizad en la base de datos el estado)
router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
    if (!task) 
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar tarea 
router.put('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar tarea
router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
