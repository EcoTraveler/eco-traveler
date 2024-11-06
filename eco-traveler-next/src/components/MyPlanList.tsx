"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { CalendarIcon, Wallet, ClockIcon, TrashIcon, EyeIcon, Coins, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { planDetail } from "@/db/models/Plan";

export default function MyPlanList() {
  const router = useRouter();
  const { user } = useUser();
  const clerkId = user?.id;
  const [plans, setPlans] = useState<planDetail[]>([]);
  const [token, setToken] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function deletePlan(id: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/planning-users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("delete plan failed");
      }

      setPlans(plans.filter(plan => plan._id.toString() !== id));
      router.refresh();
      await fetchPlans();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchPlans() {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/plan/${clerkId}`, {
        method: "GET",
      });
      const data = await response.json();
      setPlans(data.data || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateStatus(id: string | undefined, action: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/planning-users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(action),
      });

      if (!response.ok) {
        console.log("update failed");
      }
      await fetchPlans();
      router.push("my-plan");
      router.refresh();
      console.log("success update the status");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const getTokenStatus = async () => {
      try {
        setIsLoading(true);
        const status = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken?userId=${clerkId}`, { method: "GET" });
        const data = await status?.json();
        console.log(data);

        if (status.ok) {
          setToken(data?.tokens);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getTokenStatus();
  }, [clerkId]);

  useEffect(() => {
    if (!clerkId) {
      return;
    }
    fetchPlans();
  }, [clerkId]);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-transparent bg-opacity-75 flex items-center justify-center z-50">
          <Loader2 className="h-16 w-16 animate-spin text-green-500" />
        </div>
      )}
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Plans</h1>
          <Card className="flex items-center p-2 bg-green-50 border-green-200">
            <Coins className="h-6 w-6 text-yellow-500 mr-2" />
            <div>
              <CardTitle className="text-sm text-green-700">My Tokens</CardTitle>
              <p className="text-2xl font-bold text-green-800">{token}</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(plans) &&
            plans.map(plan => (
              <Card key={plan._id.toString()} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center justify-between capitalize">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-2">
                    <p className="flex items-center text-sm text-muted-foreground">
                      <Wallet className="mr-2 h-4 w-4" />
                      Budget: {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(Number(plan.budget))}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <ClockIcon className="mr-2 h-4 w-4" />
                      Duration: {plan.duration} days
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-semibold mb-2">Members:</h3>
                    <ScrollArea className="h-[100px]">
                      <ul className="space-y-2">
                        {plan?.planningUsers?.map(el => (
                          <li key={el._id?.toString()} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${el.name}`} />
                                <AvatarFallback>{el.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span>{el.name}</span>
                            </div>
                            {el.status !== "Actived" && (
                              <div className="space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(el._id?.toString(), "Accept")}>
                                  Accept
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(el._id?.toString(), "Reject")}>
                                  Reject
                                </Button>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete Plan
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this plan?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone. This will permanently delete the plan and remove all associated data.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deletePlan(plan._id.toString())}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </>
  );
}
