import { ObjectId } from "mongodb";
import { getDb } from "../config";
import OpenAI from "openai";

export type destination = {
  name: string;
  description: string;
};

export type transportation = {
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

export type aiResult = {
  destination: string[];
  transportation: string[];
  hotel: string[];
};
export type plan = {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  budget: number;
  destination?: string[];
  hotel?: string[];
  transportation?: string[];
  duration: string;
  startDate: string;
  endDate: string;
};
export type resultInputPlan = Omit<plan, "_id">;

export type inputPlan = {
  userId: string; // Use string here for incoming data
  name: string;
  budget: number;
  destination?: string[];
  hotel?: string[];
  transportation?: string[];
  duration: string;
  startDate: string;
  endDate: string;
};

// Function to get the Plan collection
export const getPlans = async () => {
  const db = await getDb();
  const Plan = db.collection("Plan");
  return Plan;
};

export async function generateAi(): Promise<aiResult> {
  const openai = new OpenAI();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content:
          "Give me recommendations of places, hotels, and transportation in Bogor for a 5-day trip, in JSON format with properties: destination[{name, description}], hotel[{name, description, rating, price}], transportation[{type, description, price}]. Only provide JSON format without any introductory text or code formatting.",
      },
    ],
  });

  const text = completion.choices[0].message.content ?? "";
  const result = JSON.parse(text);
  return result;
}

export const createPlan = async (plan: inputPlan) => {
  const modifierPlan: resultInputPlan = {
    ...plan,
    userId: new ObjectId(plan.userId),

    // Convert userId to ObjectId
  };
  console.log(modifierPlan);

  const Plan = await getPlans();
  const result = await Plan.insertOne(modifierPlan); // Use modifierPlan here
  return result;
};
