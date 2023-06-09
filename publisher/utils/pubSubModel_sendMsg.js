// publish/subscriber model

const amqp = require("amqplib");

const EXCHANGE_NAME = "logs";
const EXCHANGE_TYPE = "fanout";
const QUEUE_NAME = "";

const connectQueue = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

  await channel.publish(
    EXCHANGE_NAME,
    QUEUE_NAME,
    Buffer.from("hello, how are you?")
  );
};

module.exports = connectQueue;
