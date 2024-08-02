const Queue = require("bull");
const mongoose = require("mongoose");
const House = require("../model/houses");

const redisConfig = {
  host: "127.0.0.1",
  port: 6379,
};

const houseUpdateQueue = new Queue("house-update", { redis: redisConfig });

houseUpdateQueue.process(async (job) => {
  const { houseId, field } = job.data;
  console.log(`Processing job: Incrementing ${field} for house ${houseId}`);
  await House.findByIdAndUpdate(houseId, { $inc: { [field]: 1 } });
  console.log(`Successfully incremented ${field} for house ${houseId}`);
});
