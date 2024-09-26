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
const express = require("express")
const app = express()
const dbConnection = require("./config/config")
const router = require("./routes/task")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

dbConnection()

const PORT = 8080
app.listen(PORT, () => console.log(`La aplicación está escuchando en el puerto http://localhost:${PORT}`))


*/