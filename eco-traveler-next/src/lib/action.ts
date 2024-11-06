// "use server";

// import { clerkClient, currentUser } from "@clerk/nextjs/server";

// export async function addCredit() {
//   const user = await currentUser();

//   if (!user) {
//     return { success: false, error: "You need to sign in first" };
//   }
//   await clerkClient.users.updateUserMetdata(user.id, {
//     publicMetadata: { credits: 10 },
//   });
//   return { success: true, error: null };
// }
