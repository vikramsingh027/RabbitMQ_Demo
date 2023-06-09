// publish/subscriber model
//Sending messages to many consumers at once
//here exchange type is 'fanout'
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
    Buffer.from("hello, sending messages to all the queues")
  );
};

module.exports = connectQueue;
