import { ObjectId } from "mongodb";
import { database } from "../config";
import { PlanningUser } from "./PlanningUser";

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
  userId?: ObjectId;
  clerkId: string;
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
  userId?: string;
  clerkId?: string;
  name: string;
  budget: string;
  destination?: Inputdestination[];
  hotel?: Inputhotel[];
  transportation?: Inputtransportation[];
  duration: number;
  startDate: string;
  endDate: string;
};
export type planDetail = {
  _id: ObjectId;
  userId?: string;
  clerkId?: string;
  name: string;
  budget: string;
  destination?: Inputdestination[];
  hotel?: Inputhotel[];
  transportation?: Inputtransportation[];
  duration: number;
  startDate: string;
  endDate: string;
  planningUsers: PlanningUser[];
};
// Function to get the Plan collection
export const getPlanCollection = async () => {
  return database.collection("Plan");
};

export const createPlan = async (plan: inputPlan) => {
  const modifierPlan: resultInputPlan = {
    ...plan,
    userId: plan.userId ? new ObjectId(plan.userId) : undefined,
    clerkId: plan.clerkId ?? "",
    destination: plan.destination?.map((dest) => ({
      _id: new ObjectId(dest._id),
      name: dest.name,
      description: dest.description,
    })),
    hotel: plan.hotel?.map((h) => ({
      _id: new ObjectId(h._id),
      name: h.name,
      description: h.description,
      rating: h.rating,
      price: h.price,
    })),
    transportation: plan.transportation?.map((trans) => ({
      _id: new ObjectId(trans._id),
      type: trans.type,
      description: trans.description,
      price: trans.price,
    })),
  };
  console.log(modifierPlan);

  const Plan = await getPlanCollection();
  const result = await Plan.insertOne(modifierPlan);
  return result;
};

export const getPlans = async (): Promise<plan[]> => {
  const Plan = await getPlanCollection();
  const result = (await Plan.find().toArray()) as plan[];
  return result;
};
export const getPlan = async (clerkId: string): Promise<planDetail> => {
  const Plan = await getPlanCollection();
  const result = (await Plan.aggregate([
    {
      $match: { clerkId },
    },
    {
      $lookup: {
        from: "PlanningUsers",
        localField: "_id",
        foreignField: "planningId",
        as: "planningUsers",
      },
    },
  ]).toArray()) as unknown as planDetail;
  return result;
};

export const deletePlan = async (id: string) => {
  const Plan = await getPlanCollection();
  console.log(id);

  const result = await Plan.deleteOne({ _id: new ObjectId(id) });
  return result;
};
