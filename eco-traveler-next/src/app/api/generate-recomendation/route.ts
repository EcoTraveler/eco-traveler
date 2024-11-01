import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { destination, duration, budget } = data;
    if (!destination || !budget) {
      throw new Error("Input all field to get recomendation");
    }
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Give me recommendations of places, hotels, and transportation in ${destination} for a ${duration}-day trip with budget Rp. ${budget}, in JSON format with properties: destination[{_id:ObjectId(), name:string, description:string}], hotel[{_id:ObjectId(), name:string, description:string, rating:number, price:string}], transportation[{_id:ObjectId(), type:string, description:string, price:string}]. Only provide JSON format without any introductory text or code formatting.`,
        },
      ],
    });

    // Parse the AI response as JSON
    const recommendations = JSON.parse(
      completion.choices[0].message.content || "{}"
    );

    return NextResponse.json(recommendations);
  } catch (error) {
    const err = error as Error;
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      message: err.message,
    });
  }
}
