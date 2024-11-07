import { NextResponse } from "next/server";
import { database } from "@/db/config";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const plans = await database.collection("Plan").find({}).toArray();
    return NextResponse.json(plans);
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ err: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { planId, clerkId, name } = await request.json();

    // Check if the user is already joined
    const planningUser = await database.collection("PlanningUsers").findOne({ clerkId, planningId: planId });
    if (planningUser) {
      return NextResponse.json({ message: "Already joined" }, { status: 400 });
    }

    // If not joined, add the user to PlanningUsers
    await database.collection("PlanningUsers").insertOne({
      name: name,
      clerkId,
      planningId: new ObjectId(planId),
      status: "pending",
    });

    return NextResponse.json({ message: "Joined successfully" });
  } catch (error) {
    console.error(error);
    const err = error as Error;
    return NextResponse.json({ error: err.message, message: "Failed to join" }, { status: 500 });
  }
}

// New function to create a plan
export async function PUT(request: Request) {
  try {
    const { name, clerkId } = await request.json();
    const plan = { name, clerkId };

    const result = await database.collection("Plan").insertOne(plan);
    return NextResponse.json({ planId: result.insertedId });
  } catch (error) {
    console.error(error);
    const err = error as Error;
    return NextResponse.json({ error: err.message, message: "Failed to create plan" }, { status: 500 });
  }
}
