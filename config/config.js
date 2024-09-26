const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Base de datos conectada con éxito');
    } catch (error) {
        console.error(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = {
  dbConnection
};


/*
Tiee que genear una sincrnia y que hacemos peticions pr fuera

const mongoose = require("mongoose")
require('dotenv').config()

const dbConnection = async () => {
  try {
    console.log("Ya se ha conectado la BBDD")
    await mongoose.connect(process.env.MONGO_URI)

  } catch (err) {
    console.error("No se ha podido conectar a la BBDD: ", err)
  }
}

module.exports = dbConnection
*/ 