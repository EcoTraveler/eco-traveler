import { z } from "zod";
import { database } from "../config";
import { hashText } from "../utils/bcrypt";

const userSchema = z.object({
  name: z.string(),
  username: z.string({ message: "username is required" }),
  email: z.string().email(),
  password: z.string().min(5),
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
}
export default User;
