"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@clerk/nextjs";

type Plan = {
  _id: string;
  name: string;
  budget: string;
  duration: number;
  startDate: string;
  endDate: string;
  clerkId: string;
};

type PlanningUser = {
  _id: string;
  clerkId: string;
  planningId: string;
  status: string;
};

export default function PlanList({ initialPlans, currentUserId }: { initialPlans: Plan[]; currentUserId: string }) {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [planningUsers, setPlanningUsers] = useState<PlanningUser[]>([]);
  const router = useRouter();

  const fetchPlanningUsers = useCallback(async () => {
    const response = await fetch("/api/planning-users");
    if (response.ok) {
      const data = await response.json();
      setPlanningUsers(data);
    }
  }, []);

  useEffect(() => {
    fetchPlanningUsers();
  }, [fetchPlanningUsers]);

  const joinPlan = async (planningId: string) => {
    const response = await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planningId }),
    });

    if (response.ok) {
      await fetchPlanningUsers();
      const updatedPlans = plans.map(plan => (plan._id === planningId ? { ...plan, status: "pending" } : plan));
      setPlans(updatedPlans);
      router.refresh();
    }
  };

  const getButtonStatus = (planId: string) => {
    const planningUser = planningUsers.find(pu => pu.planningId === planId && pu.clerkId === currentUserId);
    if (planningUser) {
      return planningUser.status;
    }
    return "Join";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map(plan => (
        <Card key={plan._id} className="w-full">
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            {plan.clerkId === currentUserId && <p className="text-sm text-muted-foreground">You Created This Plan</p>}
          </CardHeader>
          <CardContent>
            <p className="text-sm">Budget: {plan.budget}</p>
            <p className="text-sm">Duration: {plan.duration} days</p>
            <p className="text-sm">Start Date: {new Date(plan.startDate).toLocaleDateString()}</p>
            <p className="text-sm">End Date: {new Date(plan.endDate).toLocaleDateString()}</p>
          </CardContent>
          <CardFooter>
            {plan.clerkId !== currentUserId && (
              <Button onClick={() => joinPlan(plan._id)} disabled={getButtonStatus(plan._id) !== "Join"} variant={getButtonStatus(plan._id) === "pending" ? "secondary" : "default"}>
                {getButtonStatus(plan._id)}
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
