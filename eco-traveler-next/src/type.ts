import { ObjectId } from "mongodb";

export type PostType = {
  userId: ObjectId;
  planningId: ObjectId;
  name: string;
  imgUrl: string;
};
