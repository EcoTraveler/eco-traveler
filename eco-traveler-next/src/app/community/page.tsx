"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function getPlan() {
  const [dataPlan, setDataPlan] = useState([]);
  const userId = useUser();
  const clerkId = userId.user?.id;
  useEffect(() => {
    const getAllPlan = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/comment?userId=${clerkId}`,
          { method: "GET" }
        );
        const data = await response.json();
        if (response.ok) {
          setDataPlan(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPlan();
  }, [clerkId]);
  console.log(dataPlan);

  return <div></div>;
}
