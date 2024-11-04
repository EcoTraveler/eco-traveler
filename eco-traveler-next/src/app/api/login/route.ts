import { createToken } from "@/db/utils/jwt";
import { cookies } from "next/headers";
import { database } from "@/db/config";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw { message: "Unauthorized", status: 401 };
    }

    const user = await database.collection("Users").findOne({ clerkId: userId });

    if (!user) {
      throw { message: "User not found", status: 404 };
    }

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    };

    const token = createToken(payload);

    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return Response.json({ message: "Login successful" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
  }
}
