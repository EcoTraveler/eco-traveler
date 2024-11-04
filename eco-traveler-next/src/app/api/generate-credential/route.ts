import { cookies } from "next/headers";
import { verifyToken } from "../../../db/utils/jwt";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookiesStore = cookies();
  const auth = cookiesStore.get("Authorization")?.value;
  if (!auth) {
    return;
  }
  console.log(auth, "ini authh");

  const token = auth.split(" ")[1];
  const decode = await verifyToken<{
    id: string;
    name: string;
    username: string;
    email: string;
  }>(token);
  console.log(decode, ">>>>>>>>>>>>>>>>>>>>>>>>> in decode");

  return NextResponse.json(decode);
};
