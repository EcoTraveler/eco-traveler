import { database } from "@/db/config";
import { errHandler } from "@/db/utils/errHandler";

export async function POST(request: Request) {
  try {
    const { clerkId, tokens, freeToken } = await request.json();
    const findUser = await database.collection("SetToken").findOne({ clerkId });
    if (findUser) throw { message: "User already have token", status: 401 };
    const setToken = await database
      .collection("SetToken")
      .insertOne({ clerkId, tokens, freeToken });
    return Response.json({ message: "set token success" });
  } catch (error) {
    return errHandler(error);
  }
}
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    const data = await database
      .collection("SetToken")
      .findOne({ clerkId: userId });

    if (!data) {
      return new Response(JSON.stringify({ error: "Data not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return errHandler(error);
  }
}
export async function PATCH(request: Request) {
  try {
    const { clerkId, tokens } = await request.json();
    const findUser = await database.collection("SetToken").findOne({ clerkId });
    if (!findUser) throw { message: "User Not Found", status: 401 };
    const tokenUser = findUser.tokens + tokens;
    const setToken = await database
      .collection("SetToken")
      .updateOne({ clerkId }, { $set: { tokens: tokenUser } });
    return new Response(
      JSON.stringify({ message: "Tokens updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
export async function PUT(request: Request) {
  try {
    const { clerkId, tokens } = await request.json();
    const findUser = await database.collection("SetToken").findOne({ clerkId });
    if (!findUser) throw { message: "User Not Found", status: 401 };
    const tokenUser = findUser.tokens - tokens;
    if (tokenUser <= 0) throw { message: "run out of token", status: 401 };
    const setToken = await database
      .collection("SetToken")
      .updateOne({ clerkId }, { $set: { tokens: tokenUser } });
    return new Response(
      JSON.stringify({ message: "Tokens updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
