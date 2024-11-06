import { ObjectId } from "mongodb";

export type PostType = {
  userId: ObjectId;
  planningId: ObjectId;
  name: string;
  imgUrl: string;
};
export interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
}