import { NextResponse } from "next/server";
import { database } from "@/db/config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planningId = searchParams.get("planningId");

  if (!planningId) {
    return NextResponse.json({ error: "PlanningId is required" }, { status: 400 });
  }

  try {
    const messages = await database.collection("Discussions").find({ planningId }).sort({ _id: 1 }).toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ message: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { planningId, clerkId, message } = await request.json();

  if (!planningId || !clerkId || !message) {
    return NextResponse.json({ error: "PlanningId, clerkId, and message are required" }, { status: 400 });
  }

  try {
    const result = await database.collection("Discussions").insertOne({
      planningId,
      clerkId,
      message,
    });

    return NextResponse.json({ id: result.insertedId, message: "Message sent successfully" });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ message: "Failed to send message" }, { status: 500 });
  }
}
