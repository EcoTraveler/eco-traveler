import { z } from "zod";
import { database } from "../config";
import { hashText } from "../utils/bcrypt";
import { ObjectId } from "mongodb";

const userSchema = z.object({
  // _id: z.string().optional(),
  name: z.string(),
  username: z.string({ required_error: "Username is required" }),
  email: z.string().email(),
  password: z.string().min(5),
  imageUrl: z.string().optional(),
});
type UserType = z.infer<typeof userSchema>;

class User {
  static collection() {
    return database.collection<UserType>("Users");
  }

  static async register(input: UserType) {
    userSchema.parse(input);
    const exituser = await this.collection().findOne({
      $or: [{ username: input.username }, { email: input.email }],
    });
    if (exituser)
      throw { message: "email/username already exist", status: 400 };
    input.password = hashText(input.password);
    const register = await this.collection().insertOne(input);
    return register;
  }

  // static async findUsers(): Promise<UserType[]> {
  //   return this.collection().find().toArray();
  // }

  // static async createUser(user: Omit<UserType, "_id">): Promise<UserType> {
  //   const validatedUser = userSchema.omit({ _id: true }).parse(user);
  //   const result = await this.collection().insertOne(validatedUser);
  //   return { ...validatedUser, _id: result.insertedId.toString() };
  // }

  // static async findUserById(id: string): Promise<UserType | null> {
  //   try {
  //     const objectId = new ObjectId(id);
  //     return this.collection().findOne({ _id: objectId });
  //   } catch (error) {
  //     console.error("Invalid ObjectId:", error);
  //     return null;
  //   }
  // }
}

export default User;
