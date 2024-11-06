import { getPlan } from "@/db/models/Plan";
import { NextResponse } from "next/server";

import { myResponse } from "../route";
// import { request } from "http";

export const GET = async (
  request: Request,
  { params }: { params: { clerkId: string } }
) => {
  try {
    const myPlans = await getPlan(params.clerkId);
    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success create plan",
        data: myPlans,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
    console.log(err);
    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 400,
        message: err.message,
      },
      {
        status: 400,
      }
    );
  }
};
