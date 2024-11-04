import { Posts } from "@/db/models/Posts";
import { errHandler } from "@/db/utils/errHandler";
import { ObjectId } from "mongodb";
export async function POST(
  request: Request,
  { params }: { params: { posts: ObjectId } }
) {
  try {
    const userId = request.headers.get("x-user-id");
    const planningId = params.posts;

    console.log(userId, "<<<<userId");
    if (!userId || !ObjectId.isValid(userId)) {
      return Response.json(
        { error: "Invalid or missing User ID" },
        { status: 400 }
      );
    }

    const data = await request.json();
    const pushPost = await Posts.createPost({
      userId,
      planningId,
      title: data.title,
      imgUrl: data.imgUrl,
    });
    return pushPost;
  } catch (error) {
    return errHandler(error);
  }
}
