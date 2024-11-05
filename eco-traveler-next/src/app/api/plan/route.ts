import { createPlan, getPlans, plan } from "@/db/models/Plan";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

export type myResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const planInputSchema = z.object({
  name: z.string().min(1, "Name required"),
  budget: z.string().min(1, "Budget required"),
  destination: z.array(z.object({ _id: z.string(), name: z.string(), description: z.string() })).min(1, "At least one destination option is required"),
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

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json<myResponse<never>>(
        {
          statusCode: 401,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const data = await request.json();
    const { endDate, startDate, duration } = data;
    if (endDate && startDate) {
      if (new Date(startDate) > new Date(endDate)) {
        throw new Error("The endDate cannot be earlier than startDate");
      }
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); //convert total time to day

    if (diffDays > duration) {
      throw new Error("The total days between startDate and endDate cannot exceed the duration.");
    }

    const parsedData = planInputSchema.safeParse(data);
    if (!parsedData.success) throw parsedData.error;

    const planData = {
      ...parsedData.data,
      clerkId: userId,
    };

    const plan = await createPlan(planData);

    return NextResponse.json<myResponse<unknown>>(
      {
        statusCode: 201,
        message: "Success create plan",
        data: plan,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    const err = error as Error;
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
}

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json<myResponse<never>>(
        {
          statusCode: 401,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const plans = await getPlans();
    return NextResponse.json<myResponse<plan[]>>({
      statusCode: 200,
      message: "Success fetch all plans",
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
}
