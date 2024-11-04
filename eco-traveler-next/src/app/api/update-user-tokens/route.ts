// pages/api/update-user-tokens.js

import { readPayload } from "@/db/utils/readPayload";
import User from "../../../db/models/Users"; // Adjust this import based on your User model path

import { ObjectId } from "mongodb";

export const POST = async (req: Request) => {
  try {
    const payload = await readPayload();
    if (!payload) {
      throw new Error("Invalid token");
    }
    const { id } = payload;
    const user = await User.collection().findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log(error);
  }
};
