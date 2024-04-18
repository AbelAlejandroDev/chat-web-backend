// Server express + socket.io
const Server = require("./models/server");

// Leer y establecer .env
require("dotenv").config();

// Inicializar el server
const server = new Server();

// Iniciando server
server.execute();
