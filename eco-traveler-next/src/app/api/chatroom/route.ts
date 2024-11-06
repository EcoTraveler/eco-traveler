import { database } from "@/db/config";
import { errHandler } from "@/db/utils/errHandler";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const agg = [
      {
        $match: { clerkId: userId, status: "Actived" },
      },
      {
        $lookup: {
          from: "Plan",
          localField: "planningId",
          foreignField: "_id",
          as: "MyPlan",
        },
      },
      { $unwind: { path: "$MyPlan", preserveNullAndEmptyArrays: true } },
    ];
    const findplan = await database
      .collection("PlanningUsers")
      .aggregate(agg)
      .toArray();
    if (!findplan) throw { message: "plan not found", status: 401 };

    return Response.json(findplan);
  } catch (error) {
    return errHandler(error);
  }
}

