import { ObjectId } from "mongodb";
import { getDb } from "../config";
// import { TraceState } from "next/dist/trace";
// import OpenAI from "openai";

export type destination = {
  _id: ObjectId;
  name: string;
  description: string;
};
export type Inputdestination = {
  _id: string;
  name: string;
  description: string;
};

export type transportation = {
  _id: ObjectId;
  type: string;
  description: string;
  price: string;
};
export type Inputtransportation = {
  _id: string;
  type: string;
  description: string;
  price: string;
};

export type hotel = {
  _id: ObjectId;
  name: string;
  description: string;
  rating: number;
  price: string;
};
export type Inputhotel = {
  _id: string;
  name: string;
  description: string;
  rating: number;
  price: string;
};

export type aiResult = {
  destination: destination[];
  transportation: transportation[];
  hotel: hotel[];
};
export type plan = {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  budget: string;
  destination?: destination[];
  hotel?: hotel[];
  transportation?: transportation[];
  duration: number;
  startDate: string;
  endDate: string;
};
export type resultInputPlan = Omit<plan, "_id">;

export type inputPlan = {
  userId: string; // Use string here for incoming data
  name: string;
  budget: string;
  destination?: Inputdestination[];
  hotel?: Inputhotel[];
  transportation?: Inputtransportation[];
  duration: number;
  startDate: string;
  endDate: string;
};

// Function to get the Plan collection
export const getPlans = async () => {
  const db = await getDb();
  const Plan = db.collection("Plan");
  return Plan;
};

// export async function generateAi(): Promise<aiResult> {
//   const openai = new OpenAI();
//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o-mini",
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       {
//         role: "user",
//         content:
//           "Give me recommendations of places, hotels, and transportation in Bogor for a 5-day trip, in JSON format with properties: destination[{name, description}], hotel[{name, description, rating, price}], transportation[{type, description, price}]. Only provide JSON format without any introductory text or code formatting.",
//       },
//     ],
//   });

//   const text = completion.choices[0].message.content ?? "";
//   const result = JSON.parse(text);
//   return result;
// }

export const createPlan = async (plan: inputPlan) => {
  const modifierPlan: resultInputPlan = {
    ...plan,
    userId: new ObjectId(plan.userId),
    destination: plan.destination?.map((dest) => ({
      _id: new ObjectId(dest._id), // Convert _id to ObjectId
      name: dest.name,
      description: dest.description,
    })),
    hotel: plan.hotel?.map((h) => ({
      _id: new ObjectId(h._id), // Convert _id to ObjectId
      name: h.name,
      description: h.description,
      rating: h.rating,
      price: h.price,
    })),
    transportation: plan.transportation?.map((trans) => ({
      _id: new ObjectId(trans._id), // Convert _id to ObjectId
      type: trans.type,
      description: trans.description,
      price: trans.price,
    })),
  };
  console.log(modifierPlan);

  const Plan = await getPlans();
  const result = await Plan.insertOne(modifierPlan); // Use modifierPlan here
  return result;
};
