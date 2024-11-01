import { NextResponse } from "next/server";
// import { findPlannings, createPlanning } from '@/db/models/Planning'
import { findPlannings, createPlanning } from "@/db/models/Planning";
import { createPlanningUser } from "@/db/models/PlanningUser";
import { ObjectId } from "mongodb";

export async function GET() {
  const plannings = await findPlannings();
  return NextResponse.json(plannings);
}

export async function POST(request: Request) {
  const { name, userId } = await request.json();
  const planning = await createPlanning({
    name,
    userId: new ObjectId(),
  });
  await createPlanningUser({
    userId: new ObjectId(userId),
    planningId: planning._id!,
    status: "approved",
  });
  return NextResponse.json(planning);
}
