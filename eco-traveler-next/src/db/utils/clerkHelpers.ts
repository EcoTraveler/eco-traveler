import { getAuth } from "@clerk/nextjs/server";

import { NextApiRequest } from 'next';

export const getUserInfo = async (req: NextApiRequest) => {
  const { userId, sessionId } = getAuth(req);
  // Fetch additional user info if necessary
  // Clerk user info would typically be fetched here
  return { clerkId: userId, name: "User Name" }; // Replace with Clerk API call if necessary
};
