import { MongoClient, Db } from "mongodb";

const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("MONGODB_CONNECTION_STRING is not defined");
}

const client: MongoClient = new MongoClient(connectionString);

export const database: Db = client.db("ecotravelling");
