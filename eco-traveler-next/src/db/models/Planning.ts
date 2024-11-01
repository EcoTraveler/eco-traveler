import { ObjectId } from "mongodb";
import { database } from "../config";

export interface Planning {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
}

const plannings = database.collection<Planning>("Plannings");

export async function findPlannings(): Promise<Planning[]> {
  return plannings.find().toArray();
}

export async function createPlanning(planning: Planning): Promise<Planning> {
  const result = await plannings.insertOne(planning);
  return { ...planning, _id: result.insertedId };
}

export async function findPlanningById(id: string): Promise<Planning | null> {
  return plannings.findOne({ _id: new ObjectId(id) });
}
