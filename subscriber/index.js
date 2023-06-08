const express = require("express");

const connectQueue = require("./utils/receive");

const setupAndStartServer = async function () {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(3001, () => {
    console.log("Server Started On Port", 3001);
    connectQueue();
  });
};

setupAndStartServer();