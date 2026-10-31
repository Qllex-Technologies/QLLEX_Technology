import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { env } from "./env";
import { logger } from "./logger";

export type DbMode = "mongodb" | "local_persistence_fallback" | "disconnected";

let currentDbMode: DbMode = "disconnected";
let embeddedMongoServer: MongoMemoryServer | null = null;

export function getDbMode(): DbMode {
  if (mongoose.connection.readyState === 1) {
    return "mongodb";
  }
  return currentDbMode;
}

export async function connectDatabase(): Promise<DbMode> {
  // 1. First attempt direct connection to configured MONGODB_URI
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    currentDbMode = "mongodb";
    logger.info("Connected to MongoDB server at MONGODB_URI", {
      host: mongoose.connection.host,
      dbName: mongoose.connection.name,
    });
    return currentDbMode;
  } catch (initialError) {
    const initialMsg =
      initialError instanceof Error ? initialError.message : String(initialError);

    logger.warn(`Could not connect directly to MONGODB_URI: ${initialMsg}`);

    if (env.NODE_ENV === "production") {
      currentDbMode = "disconnected";
      logger.error("Production MongoDB connection failed", { error: initialMsg });
      throw new Error(`Critical database connection error: ${initialMsg}`);
    }

    // 2. In development/test, launch an embedded real MongoDB daemon (MongoMemoryServer)
    try {
      const dbPath = path.resolve(process.cwd(), ".data", "mongodb-instance");
      if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(dbPath, { recursive: true });
      }

      logger.info(
        "External mongod not detected on port 27017; starting embedded MongoDB server (MongoMemoryServer)..."
      );

      embeddedMongoServer = await MongoMemoryServer.create({
        instance: {
          dbName: "qllex_db",
          dbPath,
          storageEngine: "wiredTiger",
        },
      });

      const embeddedUri = embeddedMongoServer.getUri("qllex_db");
      await mongoose.connect(embeddedUri);
      currentDbMode = "mongodb";
      logger.info("Connected to embedded MongoDB server (Mongoose active)", {
        uri: embeddedUri,
        dbName: mongoose.connection.name,
      });
      return currentDbMode;
    } catch (embeddedError) {
      const embeddedMsg =
        embeddedError instanceof Error
          ? embeddedError.message
          : String(embeddedError);

      if (!env.ALLOW_MEMORY_DB_FALLBACK) {
        currentDbMode = "disconnected";
        logger.error("MongoDB connection failed and fallback is disabled", {
          error: embeddedMsg,
        });
        return currentDbMode;
      }

      currentDbMode = "local_persistence_fallback";
      logger.warn(
        "Embedded MongoDB binary could not start; activating Mongoose-validated local persistence fallback (.data/local-db.json).",
        { reason: embeddedMsg }
      );
      return currentDbMode;
    }
  }
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (embeddedMongoServer) {
    await embeddedMongoServer.stop();
    embeddedMongoServer = null;
  }
}
