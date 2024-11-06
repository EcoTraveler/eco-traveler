import { ObjectId } from "mongodb";
import { database } from "../config";

export interface PlanningUser {
  _id?: ObjectId;
  name: string;
  clerkId: string;
  planningId: ObjectId;
  status: string;
}

const planningUsers = database.collection<PlanningUser>("PlanningUsers");

export const updateStatusAccept = async (id: string) => {
  const result = await planningUsers.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "Actived" } },
    { upsert: true }
  );
  return result;
};

export const updateStatusReject = async (id: string) => {
  const result = await planningUsers.deleteOne({ _id: new ObjectId(id) });
  return result;
};

export const getPlanningUser = async (
  clerkId: string
): Promise<PlanningUser> => {
  try {
    // Find the user in planningUsers collection based on planningId and clerkId
    const result = (await planningUsers
      .find({
        clerkId,
      })
      .toArray()) as unknown as PlanningUser;
    return result;
  } catch (error) {
    console.error("Error fetching planning user:", error);
    throw new Error("Failed to fetch planning user");
  }
};
