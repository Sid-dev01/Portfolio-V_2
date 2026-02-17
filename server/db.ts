import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "MONGODB_URI must be set. Did you forget to add your MongoDB connection string?",
  );
}

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "portfolio",
      bufferCommands: false,
    });

    isConnected = true;
    console.log("Connected to MongoDb");
  } catch (error) {
    throw error;
  }
}

// Handle connection events
mongoose.connection.on("connected", () => {
  console.log("MongoDB connection established");
});

mongoose.connection.on("error", (err: any) => {
  console.log("mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  isConnected = false;
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

export default mongoose;
