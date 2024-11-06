import { ObjectId } from "mongodb";

export type PostType = {
  userId: ObjectId;
  planningId: ObjectId;
  name: string;
  imgUrl: string;
};

export interface Discussion {
  _id?: ObjectId;
  planningId: string;
  clerkId: string;
  createdAt: Date;
  message: string;
}

export interface Plan {
  _id?: ObjectId;
  name: string;
  clerkId: string;
}

export interface PlanningUser {
  _id?: ObjectId;
  planningId: string;
  clerkId: string;
  status: string;
}

export interface Message {
  roomId: string;
  clerkId: string;
  username: string;
  content: string;
}
export type MessageType = {
  message: [Message];
};

export interface User {
  id: string;
  username: string;
}

