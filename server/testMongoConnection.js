import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

// Use your actual URI with password
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); // Connect to Atlas
    // Ping database to check connection
    await client.db("resume-builder").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  } finally {
    await client.close();
  }
}

run();