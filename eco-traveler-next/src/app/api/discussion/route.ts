import { NextResponse } from "next/server";
import { createDiscussion } from "@/db/models/Discussion";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const planningId = formData.get("planningId") as string;
  let message = formData.get("message") as string;
  const file = formData.get("file") as File | null;

  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });
    message = (result as any).secure_url;
  }

  const discussion = await createDiscussion({
    userId: new ObjectId(userId),
    planningId: new ObjectId(planningId),
    message,
  });

  return NextResponse.json(discussion);
}
