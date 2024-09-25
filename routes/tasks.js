const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Middleware Create tarea
router.post('/create', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});    /*(prueba postman POST: http://localhost:8080/  ->
{"title":"compras"} 201) OK */

//Middleware/route get all tareas 
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});    /*(prueba postman GET: http://localhost:8080/ --> SEND) 201 OK*/


//Middleware/route get tarea by Id (busca por id) 
router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});   /*(prueba postman GET: http://localhost:8080/id/66f49c669d86fbc3853ddf82) --> SEND) 200 */


//Middleware/route mark task as complete. (este PUT que marcar la tarea completada,  actualizad en la base de datos el estado) 
router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
    if (!task) 
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});    /*(prueba postman PUT: http://localhost:8080/id/66f49c669d86fbc3853ddf82) --> {
    "_id": "66f49c669d86fbc3853ddf82",
    "title": "bañar a canela",
    "completed": true,
    "createdAt": "2024-09-25T23:27:34.346Z",
    "updatedAt": "2024-09-25T23:36:22.193Z",
    "__v": 0
}
SEND) in 200 OK*/


///Middleware/path to update tasks by id
router.put('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});   /* (prueba postman PUT: http://localhost:8080/id/66f49c669d86fbc3853ddf82) ---> SEND 
   {
    "_id": "66f49d4e9d86fbc3853ddf86",
    "title": "lavar coche",
    "completed": false,
    "createdAt": "2024-09-25T23:31:26.358Z",
    "updatedAt": "2024-09-25T23:50:11.707Z",
    "__v": 0
}   
in 200 OK*/

//Middleware/route to delete tasks 
router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});    /* (prueba postman DELETE: http://localhost:8080/id/66f49c669d86fbc3853ddf82) ---> SEND 
{
    "message": "Tarea eliminada"
}
in 200 OK*/


module.exports = router;
