const { MongoClient } = require("mongodb");
require("dotenv").config();

async function test() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

test();