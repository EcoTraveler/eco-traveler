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
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function MyPlanList() {
  const router = useRouter();
  const { user } = useUser();
  const clerkId = user?.id;
  const [plans, setPlans] = useState<planDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);

  async function deletePlan(id: string) {
    setLoadingPlanId(id);
    setIsLoading(true);
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
      await fetchPlans();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setLoadingPlanId(null);
    }
  }

  async function fetchPlans() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/plan/${clerkId}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);

      setPlans(data.data || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateStatus(id: string | undefined, action: string) {
    setLoadingPlanId(id || null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/planning-users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(action),
        }
      );

      if (!response.ok) {
        throw new Error("update failed");
      }
      await fetchPlans();
      router.push("my-plan");
      router.refresh();
      console.log("success update the status");
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsLoading(false);
      setLoadingPlanId(null);
    }
  }

  useEffect(() => {
    if (!clerkId) {
      return;
    }
    fetchPlans();
  }, [clerkId]);

  if (isLoading && plans.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
              <ul className="space-y-2 mt-4">
                {plan?.planningUsers?.map((el) => (
                  <li
                    key={el._id?.toString()}
                    className="flex items-center space-x-2">
                    <span>{el.name}</span>
                    {el.status !== "Actived" ? (
                      <>
                        <Button
                          onClick={() =>
                            handleUpdateStatus(el._id?.toString(), "Accept")
                          }
                          disabled={
                            isLoading && loadingPlanId === el._id?.toString()
                          }>
                          {isLoading && loadingPlanId === el._id?.toString() ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Accept"
                          )}
                        </Button>
                        <Button
                          onClick={() =>
                            handleUpdateStatus(el._id?.toString(), "Reject")
                          }
                          disabled={
                            isLoading && loadingPlanId === el._id?.toString()
                          }>
                          {isLoading && loadingPlanId === el._id?.toString() ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Reject"
                          )}
                        </Button>
                      </>
                    ) : (
                      <Button disabled>Member</Button>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="space-x-2">
              <Button onClick={() => router.push(`/plans/${plan._id}`)}>
                View Plan
              </Button>
              <Button
                onClick={() => deletePlan(plan._id.toString())}
                disabled={isLoading && loadingPlanId === plan._id.toString()}>
                {isLoading && loadingPlanId === plan._id.toString() ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete Plan"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
