// Server Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const cors = require("cors");

const Sockets = require("./sockes");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Conectar a BD
    dbConnection();

    // Http
    this.server = http.createServer(this.app);

    // Config socket
    this.io = socketio(this.server, {
      /*config*/
    });
  }

  middlewares() {
    // Directorio public
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // cors - todos los origenes
    this.app.use(
      cors({
        origin: "*", 
        methods: ["GET", "POST"],
        allowedHeaders: "*", 
        credentials: true, 
      })
    );

    // Parseo del body
    this.app.use(express.json());

    // API ENDPOint
    this.app.use("/api/login", require("../router/auth"));
    this.app.use("/api/mensajes", require("../router/mensajes"));
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Init middlewares
    this.middlewares();
    // Init sockets
    this.configSockets();

    // Init server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
