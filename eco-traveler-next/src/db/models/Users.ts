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
  imgUrl: z.string().default("https://placehold.co/200x/ffa8e4/ffffff.svg?text=%CA%95%E2%80%A2%CC%81%E1%B4%A5%E2%80%A2%CC%80%CA%94&font=Lato"),
  token: z.number().default(5),
  clerkId: z.string().optional(), // Tambahkan clerkId ke dalam skema
});
type UserType = z.infer<typeof userSchema>;

class User {
  static userSchema = userSchema;
  static collection() {
    return database.collection<UserType>("Users");
  }

  static async register(input: UserType, clerkId: string) {
    // Tambahkan clerkId sebagai parameter
    const validation = this.userSchema.safeParse(input);
    if (!validation.success) {
      throw new z.ZodError(validation.error.issues);
    }
    const exituser = await this.collection().findOne({
      $or: [{ username: input.username }, { email: input.email }],
    });
    if (exituser) throw { message: "email/username already exist", status: 400 };
    input.password = hashText(input.password);
    input.clerkId = clerkId; // Set clerkId dengan nilai yang diberikan
    const register = await this.collection().insertOne(input);
    return register;
  }
}

export default User;
