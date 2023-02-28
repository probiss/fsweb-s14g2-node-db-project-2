const express = require("express")

const server = express()

server.use(express.json());

const NFS = require("./cars/cars-router");

server.use("/api/cars", NFS);
server.get("/", (req, res) => {
    res.json({ message: "Alırım anahtarını mayk..." });
});


module.exports = server;
