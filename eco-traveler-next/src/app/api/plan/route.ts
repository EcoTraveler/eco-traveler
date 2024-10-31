import { createPlan } from "@/app/db/model/plants";
import { NextResponse } from "next/server";
import { z } from "zod";
export type myResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};
const planInputSchema = z.object({
  userId: z.string(),
  name: z.string(),
  budget: z.number(),
  duration: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});
export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    console.log(data);

    const parsedData = planInputSchema.safeParse(data);
    if (!parsedData.success) throw parsedData.error;
    const plan = await createPlan(parsedData.data);

    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 201,
        message: "success create plan",
        data: plan,
      },
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.log(err);

    if (err instanceof z.ZodError) {
      const errPath = err.issues[0].path[0];
      const errMessage = err.issues[0].message;
      return NextResponse.json<myResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json<myResponse<never>>(
      {
        statusCode: 500,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
};
