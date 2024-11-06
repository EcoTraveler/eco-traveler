import { NextResponse } from "next/server";

import { myResponse } from "../../plan/route";
import {
  updateStatusAccept,
  updateStatusReject,
} from "@/db/models/PlanningUser";
import { deletePlan } from "@/db/models/Plan";

export const PATCH = async (
  req: Request,
  { params }: { params: { planUserId: string } }
) => {
  try {
    const action = await req.json();
    if (!action) throw new Error("Action Required");

    let result;
    if (action == "Accept") {
      result = await updateStatusAccept(params.planUserId);
    } else {
      result = await updateStatusReject(params.planUserId);
    }
    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 200,
        message: "update planning user Success",
        data: result,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    const err = error as Error;
    console.log(err);

    return NextResponse.json<myResponse<unknown>>({
      statusCode: 400,
      message: "update user failed",
    });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { planUserId: string } }
) => {
  try {
    console.log(params, ">>>>>>>>>>>>>>>>>");

    const deletedPlan = await deletePlan(params.planUserId);
    return NextResponse.json<myResponse<unknown>>({
      statusCode: 200,
      message: "delete plan success",
      data: deletedPlan,
    });
  } catch (error) {
    error = error as Error;
    console.log(error);
    return NextResponse.json<myResponse<unknown>>({
      statusCode: 400,
      message: "delete plan failed",
    });
  }
};
