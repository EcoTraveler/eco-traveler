// import { cookies } from "next/headers";
// import { verifyToken } from "./jwt";
// export const readPayload = async () => {
//   const cookiesStore = cookies();
//   const auth = cookiesStore.get("Authorization")?.value;
//   if (!auth) {
//     return;
//   }
//   const token = auth.split(" ")[1];
//   const decode = await verifyToken<{
//     id: string;
//     name: string;
//     username: string;
//     email: string;
//   }>(token);
//   return NextResponse.json(decode);
// };
