// db/utils/jwt.ts
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import * as jose from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "SAFE KEY";

type userToken = {
  id: ObjectId;
  email: string;
  username: string;
  name: string;
};

export const createToken = (payload: userToken) =>
  jwt.sign(payload, SECRET_KEY);

export const verifyToken = async <T>(token: string): Promise<T> => {
  try {
    const secret = new TextEncoder().encode(SECRET_KEY);
    const result = await jose.jwtVerify<T>(token, secret);
    return result.payload;
  } catch (error) {
    console.error('Token verification failed:', error);
    throw error;
  }
};