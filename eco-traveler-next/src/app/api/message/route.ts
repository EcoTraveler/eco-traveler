import { database } from "@/db/config";
import { errHandler } from "@/db/utils/errHandler";
import { ObjectId } from "mongodb";
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const roomId = url.searchParams.get("roomId");

    if (!roomId) {
      return new Response(JSON.stringify({ error: "Room ID is required" }), {
        status: 400,
      });
    }

    const data = await database
      .collection("Messages")
      .find({ roomId: new ObjectId(roomId) })
      .toArray();

    if (!data) {
      return new Response(JSON.stringify({ error: "Data not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const { clerkId, roomId, content, username } = await request.json();
    const data = await database
      .collection("Messages")
      .insertOne({ clerkId, roomId: new ObjectId(roomId), content, username });
    return Response.json({ message: "Message created successfully" });
  } catch (error) {
    return errHandler(error);
  }
}
