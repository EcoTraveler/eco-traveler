import { ObjectId } from "mongodb";
import { getDb } from "../config";
import OpenAI from "openai";

export type destination = {
  name: string;
  description: string;
};

export type tranportasion = {
  type: string;
  description: string;
  price: number;
};

export type hotel = {
  name: string;
  description: string;
  rating: number;
  price: number;
};
// const OpenAI = require("openai");

export type plan = {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  destination?: destination[];
  hotel?: hotel[];
  transportation?: tranportasion[];
  duration: string;
  startDate: string;
  endDate: string;
};

export type inputPlan = Omit<plan, "_id">;
export const getPlans = async () => {
  const db = await getDb();
  const Plan = await db.collection("Plan");
  return Plan;
};
export async function generateAi() {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          " give me recomendation of place ,hotel and transpotasion in bogor with duration 5 day,  in json format which have properyty: destination[{name,description}],hotel[{name,description,rating,price}],tranportasion[{type,description,price}], without opening sentence just give me the json format that i can parse into an object and without ``` this",
      },
    ],
  });

  console.log(completion.choices[0].message);
  const text: any = completion.choices[0].message.content;
  const result: any = JSON.parse(text);
  return result;
}
export const createPlan = async (plan: inputPlan) => {
  const Plan = await getPlans();
  const result = await Plan.insertOne(plan);
  return result;
};
