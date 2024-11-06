import { NextResponse } from 'next/server';
import { database } from '@/db/config';
import { ObjectId } from 'mongodb';
import { getUserInfo } from "@/db/utils/clerkHelpers";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userInfo = await getUserInfo(req);

  if (req.method === "POST") {
    const { name } = req.body;
    const plan = { name, clerkId: userInfo.clerkId };

    const result = await database.collection("Plan").insertOne(plan);
    res.status(200).json({ planId: result.insertedId });
  } else if (req.method === "GET") {
    const plans = await database.collection("Plan").find({}).toArray();
    res.status(200).json(plans);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
