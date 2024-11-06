"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { planDetail } from "@/db/models/Plan";
import { useUser } from "@clerk/nextjs"; // Ensure you have the correct import for useUser
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function MyPlanList() {
  const router = useRouter();
  const { user } = useUser();
  const clerkId = user?.id;
  const [plans, setPlans] = useState<planDetail[]>([]);

  async function deletePlan(id: string) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/planning-users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("delete plan failed");
      }

      setPlans(plans.filter((plan) => plan._id.toString() !== id));
      router.refresh();
      fetchPlans();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchPlans() {
    try {
      const response = await fetch(`/api/plan/${clerkId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);

      setPlans(data.data || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    }
  }
  async function handleUpdateStatus(id: string | undefined, action: string) {
    const response = await fetch(
      `http://localhost:3000/api/planning-users/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(action),
      }
    );

    if (!response.ok) {
      console.log("update failed");
    }
    fetchPlans();
    router.push("my-plan");
    router.refresh();
    console.log("success update the status");
  }

  useEffect(() => {
    if (!clerkId) {
      return;
    }
    fetchPlans();
  }, [clerkId]);

  return (
    <div>
      {Array.isArray(plans) &&
        plans.map((plan) => (
          <Card key={plan._id.toString()}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Budget: {plan.budget}</p>
              <p>Duration: {plan.duration} days</p>
              <p>Start Date: {plan.startDate}</p>
              <p>End Date: {plan.endDate}</p>
              <ul>
                {plan?.planningUsers?.map((el) => (
                  <>
                    <li key={el._id?.toString()}>{el.name}</li>
                    {el.status != "Actived" && (
                      <>
                        <Button
                          onClick={() =>
                            handleUpdateStatus(el._id?.toString(), "Accept")
                          }>
                          Accept
                        </Button>
                        <Button
                          onClick={() =>
                            handleUpdateStatus(el._id?.toString(), "Reject")
                          }>
                          Reject
                        </Button>
                      </>
                    )}
                    <Button>member</Button>
                  </>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push(`/plans/${plan._id}`)}>
                View Plan
              </Button>
              <Button onClick={() => deletePlan(plan._id.toString())}>
                delete plan
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
