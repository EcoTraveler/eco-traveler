import { z } from "zod";

export const errHandler = (err: unknown): Response => {
  let message = "internal server error";
  let status = 500;

  if (err instanceof z.ZodError) {
    message = err.issues[0].message;
    status = 400;
  } else if (err instanceof Error) {
    message = err.message;
    // You can set status based on different error types if needed
    status = status; // Optional: Check for a custom status
  }

  return Response.json(
    {
      message: message,
    },
    { status: status }
  );
};
