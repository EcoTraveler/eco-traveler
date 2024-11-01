import { createPlan, getPlans, plan } from "@/db/models/Plan";
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
  name: z.string().min(1, "Name required"),
  budget: z.string().min(1, "Budget required"),
  destination: z
    .array(
      z.object({ _id: z.string(), name: z.string(), description: z.string() })
    )
    .min(1, "At least one destination option is required"),
  hotel: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string(),
      rating: z.number(),
      price: z.string(),
    })
  ),
  transportation: z.array(
    z.object({
      _id: z.string(),
      type: z.string(),
      description: z.string(),
      price: z.string(),
    })
  ),

  duration: z.number().min(1, "Duration required"),
  startDate: z.string().min(1, "startDate required"),
  endDate: z.string().min(1, "endDate required"),
});
export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { endDate, startDate, duration } = data;
    if (endDate && startDate) {
      if (new Date(startDate) > new Date(endDate)) {
        throw new Error("the endDate cannot be earlier than startDate");
      }
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //convert total time  to day

    if (diffDays > duration) {
      throw new Error(
        "The total days between startDate and endDate cannot exceed the duration."
      );
    }

    console.log(data, "ini data input>>>>>>>>>>>>>>>>>>>>>>>>>>");

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
  } catch (error) {
    const err = error as Error;

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

export const GET = async () => {
  try {
    const plans = await getPlans();
    return NextResponse.json<myResponse<plan[]>>({
      statusCode: 200,
      message: "success fetch all plans",
      data: plans,
    });
  } catch (error) {
    const err = error as Error;
    console.log(err);
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
