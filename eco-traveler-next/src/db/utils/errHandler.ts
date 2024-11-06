import { ChevronsLeftRightEllipsisIcon } from "lucide-react";
import { z } from "zod";

export const errHandler = (err: any): Response => {
  let message = "internal server error";
  let status = 500;
  console.log(err);

  if (err instanceof z.ZodError) {
    message = err.issues[0].message;
    status = 400;
  } else if (err instanceof Error) {
    message = err.message;
    // You can set status based on different error types if needed
    status = status; // Optional: Check for a custom status
  }
  if (err.message == "email/username already exist") {
    message = err.message;
    status = err.status;
  }
  if (err.message == "invalid email/password") {
    message = err.message;
    status = err.status;
  }
  if (err.message == "run out of token") {
    message = err.message;
    status = err.status;
  }
  if (err.message == "Input all field to get recomendation") {
    message = err.message;
    status = err.status;
  }
  if (err.message == "The endDate cannot be earlier than startDate") {
    message = err.message;
    status = err.status;
  }
  if (
    err.message ==
    "The total days between startDate and endDate cannot exceed the duration."
  ) {
    message = err.message;
    status = err.status;
  }
  if (err.message == "comment not found") {
    message = err.message;
    status = err.status;
  }
  return Response.json(
    {
      message: message,
    },
    { status: status }
  );
};
