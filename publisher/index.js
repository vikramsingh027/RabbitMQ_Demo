const express = require("express");

const connectQueue = require("./utils/send");

const setupAndStartServer = async function () {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(3000, async () => {
    console.log("Server Started On Port", 3000);
    connectQueue();
  });
};

setupAndStartServer();
