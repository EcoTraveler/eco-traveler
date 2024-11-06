import { ObjectId } from "mongodb";

export type PostType = {
  userId: ObjectId;
  planningId: ObjectId;
  name: string;
  imgUrl: string;
};
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
