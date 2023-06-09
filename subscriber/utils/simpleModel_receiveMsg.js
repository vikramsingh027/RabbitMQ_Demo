//simple model for demo purpose
const amqplib = require("amqplib");

const connectQueue = async function () {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "new_queue";

    await channel.assertQueue(queue);

    //await based syntax does not work here
    // const msg = await channel.consume(queue);
    // if (!msg) console.log(msg);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(msg.content.toString());
        channel.ack(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = connectQueue;
