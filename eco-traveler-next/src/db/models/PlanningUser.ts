// db/models/PlanningUser.ts
import { ObjectId } from "mongodb";
import { database } from "../config";

export interface PlanningUser {
  _id?: ObjectId;
  userId: ObjectId;
  planningId: ObjectId;
  status: string;
}

const planningUsers = database.collection<PlanningUser>("PlanningUsers");

export async function findPlanningUsers(
  planningId: string
): Promise<PlanningUser[]> {
  return planningUsers.find({ planningId: new ObjectId(planningId) }).toArray();
}

export async function createPlanningUser(
  planningUser: PlanningUser
): Promise<PlanningUser> {
  const result = await planningUsers.insertOne(planningUser);
  return { ...planningUser, _id: result.insertedId };
}

export async function updatePlanningUserStatus(
  id: string,
  status: string
): Promise<boolean> {
  const result = await planningUsers.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );
  return result.modifiedCount > 0;
}