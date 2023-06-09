//sending message directly to queue
//It's just a learning demo
const amqplib = require("amqplib");

const connectQueue = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queue = "new_queue";
    let msg = "hello world";
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(msg));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = connectQueue;
