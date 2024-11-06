"use client";

import { useParams } from "next/navigation";

export default function Comment() {
  const params = useParams();
  const { planningId } = params;

  console.log("Parameter ID:", planningId);

  return <div>Parameter ID: {planningId}</div>;
}
