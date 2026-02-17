import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  let MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI must be set. Did you forget to add your MongoDB connection string?",
    );
  }

  // Ensure connection string has required parameters for SSL/TLS
  const url = new URL(MONGODB_URI);
  if (!url.searchParams.has('retryWrites')) {
    url.searchParams.set('retryWrites', 'true');
  }
  if (!url.searchParams.has('w')) {
    url.searchParams.set('w', 'majority');
  }
  // Force TLS for production environments
  if (process.env.NODE_ENV === 'production') {
    url.searchParams.set('tls', 'true');
    url.searchParams.set('tlsAllowInvalidCertificates', 'false');
  }
  
  MONGODB_URI = url.toString();
  
  console.log('Attempting MongoDB connection...');
  console.log('Environment:', process.env.NODE_ENV || 'development');

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "portfolio",
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000, // Increased timeout for Render
      socketTimeoutMS: 75000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
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
