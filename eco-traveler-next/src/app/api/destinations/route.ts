import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_CONNECTION_STRING ?? "";
const dbName = process.env.MONGODB_DB_NAME;

interface Destination {
  provinsi: string;
  destination: {
    name: string;
    description: string;
    imgUrl: string;
  };
}

interface MyResponse<T> {
  statusCode: number;
  message?: string;
  error?: string;
  data?: T;
}

let client: MongoClient | null = null;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName);
}

async function getDestinations(): Promise<Destination[]> {
  const db = await connectToDatabase();
  return db.collection<Destination>("destinations").find({}).toArray();
}

export async function GET() {
  try {
    if (!client) {
      await connectToDatabase();
    }
    const destinations = await getDestinations();
    return NextResponse.json<MyResponse<Destination[]>>({
      statusCode: 200,
      message: "Success fetch all destinations",
      data: destinations,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 500,
        error: "An error occurred while fetching destinations",
      },
      {
        status: 500,
      }
    );
  } finally {
    if (client) {
      await client.close();
      client = null;
    }
  }
}
