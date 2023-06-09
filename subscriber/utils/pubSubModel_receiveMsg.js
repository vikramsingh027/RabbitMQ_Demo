const amqp = require("amqplib");

const EXCHANGE_NAME = "logs";
const EXCHANGE_TYPE = "fanout";
const QUEUE_NAME = "";

const connectQueue = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);

  const q = await channel.assertQueue(QUEUE_NAME);

  const BINDING_KEY = "";
  await channel.bindQueue(q.queue, EXCHANGE_NAME, BINDING_KEY);

  channel.consume(q.queue, (msg) => {
    if (msg) {
      console.log(msg.content.toString());
      channel.ack(msg);
    }
  });
};

module.exports = connectQueue;
