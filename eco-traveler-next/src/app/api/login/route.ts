import { createToken } from "@/db/utils/jwt";
import { cookies } from "next/headers";
import { compareTextWithHash } from "@/db/utils/bcrypt";
import { errHandler } from "@/db/utils/errHandler";
import { database } from "@/db/config";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log(email, password);
    const user = await database.collection("Users").findOne({ email });
    if (!user) throw { message: "invalid email/password", status: 401 };
    const validpass = compareTextWithHash(password, user.password);
    if (validpass === false || !validpass)
      throw { message: "invalid email/password" };
    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const token = createToken(payload);

    cookies().set("token", token, {
      httpOnly: true,
      secure: false,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      sameSite: "strict",
    });
    return Response.json({ access_token: token });
  } catch (error) {
    return errHandler(error);
  }
}
