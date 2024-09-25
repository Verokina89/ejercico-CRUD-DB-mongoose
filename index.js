const express = require("express")
const app = express()
const {dbConnection} = require("./config/config")
const router = require("./routes/tasks")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

dbConnection()

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))


/*
// Conectar a la base de datos
connectDB();

// Middleware
app.use(express.json());
app.use('/tasks', tasksRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
*/