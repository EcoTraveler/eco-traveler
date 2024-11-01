import { ObjectId } from "mongodb";
import { database } from "../config";

export interface Discussion {
  _id?: ObjectId;
  userId: ObjectId;
  planningId: ObjectId;
  message: string;
}

const discussions = database.collection<Discussion>("Discussions");

export async function findDiscussions(
  planningId: string
): Promise<Discussion[]> {
  return discussions.find({ planningId: new ObjectId(planningId) }).toArray();
}

export async function createDiscussion(
  discussion: Discussion
): Promise<Discussion> {
  const result = await discussions.insertOne(discussion);
  return { ...discussion, _id: result.insertedId };
}
