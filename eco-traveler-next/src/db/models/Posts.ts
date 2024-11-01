import { z } from "zod";
import { ObjectId } from "mongodb";
import { database } from "../config";
const ObjectIdSchema = z
  .string()
  .refine((val) => ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  })
  .or(z.instanceof(ObjectId));
const PostSchema = z.object({
  userId: ObjectIdSchema,
  planningId: ObjectIdSchema,
  title: z.string(),
  imgUrl: z.string(),
});
type PostType = z.infer<typeof PostSchema>;
export class Posts {
  static async createPost(input: PostType) {
    console.log(input);
    const createpost = {
      userId: new ObjectId(input.userId),
      planningId: new ObjectId(input.planningId),
      title: input.title,
      imgUrl: input.imgUrl,
    };
    const cekpost = await database
      .collection("Posts")
      .findOne({ planningId: createpost.planningId });
    console.log(cekpost);
    if (cekpost) {
      throw new Error("planning already exits");
    }

    const inputPost = await database.collection("Posts").insertOne(createpost);
    if (!inputPost) throw Response.json({ message: "add post failed" });
    return Response.json({ message: "add post success" });
  }
}
