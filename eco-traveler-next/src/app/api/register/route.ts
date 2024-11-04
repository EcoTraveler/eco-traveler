import User from "@/db/models/Users";
import { errHandler } from "@/db/utils/errHandler";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();
    console.log({ name, username, email, password });
    const validation = User.userSchema.safeParse({
      name,
      username,
      email,
      password,
    });
    if (!validation.success) {
      const errPath = validation.error.issues[0].path[0];
      const errMessage = validation.error.issues[0].message;
      return Response.json(
        { message: `${errPath} ${errMessage}` },
        { status: 400 }
      );
    }
    await User.register(validation.data);
    return Response.json({ message: "register success" });
  } catch (error: any) {
    return errHandler(error);
  }
}
