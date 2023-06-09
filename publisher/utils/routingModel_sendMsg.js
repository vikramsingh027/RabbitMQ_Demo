//routing model
//here exchange type is 'direct'
const amqp = require("amqplib");

const EXCHANGE_NAME = "direct_logs";
const EXCHANGE_TYPE = "direct";
const ROUTING_KEY = "black";
const connectQueue = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

  await channel.publish(
    EXCHANGE_NAME,
    ROUTING_KEY,
    Buffer.from("hey, sending messages to queues with binding key 'black'")
  );
};

module.exports = connectQueue;
