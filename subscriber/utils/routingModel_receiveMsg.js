//routing model
//here exchange type is 'direct'
// Receiving messages selectively
const amqp = require("amqplib");

const EXCHANGE_NAME = "direct_logs";
const EXCHANGE_TYPE = "direct";
const QUEUE_NAME = "test_queue";

const connectQueue = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

  const q = await channel.assertQueue(QUEUE_NAME);

  const BINDING_KEY = "black";
  await channel.bindQueue(q.queue, EXCHANGE_NAME, BINDING_KEY);

  await channel.consume(q.queue, (msg) => {
    if (msg) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  });
};

module.exports = connectQueue;
