import { database } from "@/db/config";
import { errHandler } from "@/db/utils/errHandler";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    const findplan = await database
      .collection("PlanningUsers")
      .find({ clerkId: userId })
      .toArray();
    if (!findplan) throw { message: "comment not found", status: 401 };

    return Response.json(findplan);
  } catch (error) {
    return errHandler(error);
  }
}
