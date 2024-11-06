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
    const planningUser = await database
      .collection("PlanningUsers")
      .findOne({ clerkId, planningId: planId });

    if (planningUser) {
      return NextResponse.json({ message: "Already joined" }, { status: 400 });
    }

    await database.collection("PlanningUsers").insertOne({
      name: name,
      clerkId,
      planningId: new ObjectId(planId),
      status: "pending",
    });

    return NextResponse.json({ message: "Joined successfully" });
  } catch (error) {
    console.log(error);

    const err = error as Error;
    return NextResponse.json(
      { error: err, message: "failed to join" },
      { status: 500 }
    );
  }
}
