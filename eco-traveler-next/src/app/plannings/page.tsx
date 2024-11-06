"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Clock, Plane, Hotel, Bus, Wallet, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Plan {
  _id: string;
  name: string;
  budget: string;
  destination: Array<{ name: string; description: string }>;
  hotel: Array<{
    name: string;
    description: string;
    rating: number;
    price: string;
  }>;
  transportation: Array<{ type: string; description: string; price: string }>;
  duration: number;
  startDate: string;
  endDate: string;
  clerkId: string;
  userId: string | null;
}

interface PlanningUser {
  clerkId: string;
  planningId: string;
  status: string;
}

export default function PlannerList() {
  const { user } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [planningUsers, setPlanningUsers] = useState<PlanningUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlans();
    if (user) {
      fetchPlanningUsers();
    }
  }, [user]);

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/plans");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPlanningUsers = async () => {
    try {
      const response = await fetch(`/api/planning-users?clerkId=${user?.id}`);
      const data = await response.json();
      setPlanningUsers(data);
    } catch (error) {
      console.error("Failed to fetch planning users:", error);
    }
  };

  const joinPlan = async (planId: string) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, clerkId: user.id, name: user.fullName }),
      });

      if (response.ok) {
        const newPlanningUser = await response.json();
        setPlanningUsers(prevUsers => [...prevUsers, newPlanningUser]);
        toast({
          title: "Success!",
          description: "You have successfully joined the plan, waiting for the owner to approve.",
        });
      } else {
        throw new Error("Failed to join plan");
      }
    } catch (error) {
      console.error("Failed to join plan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanStatus = (planId: string) => {
    const planningUser = planningUsers.find(pu => pu.planningId === planId);
    return planningUser ? planningUser.status : "Join";
  };

  const getButtonText = (plan: Plan) => {
    if (plan.clerkId === user?.id) return "Your Plan";
    const status = getPlanStatus(plan._id);
    if (status === "pending") return "Pending";
    return "Join";
  };

  const isButtonDisabled = (plan: Plan) => {
    return plan.clerkId === user?.id || getPlanStatus(plan._id) === "pending";
  };

  const filteredPlans = plans.filter(plan => plan.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto p-4 relative min-h-screen">
        <Toaster />
        {isLoading && (
          <div className="absolute inset-0 bg-transparent bg-opacity-75 flex items-center justify-center z-50">
            <Loader2 className="h-16 w-16 animate-spin text-green-500" />
          </div>
        )}
        <h1 className="text-3xl font-bold mb-6 text-center">Discover Amazing Travel Plans</h1>
        <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <Input placeholder="Search plans..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="max-w-sm" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map(plan => (
            <Card key={plan._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 capitalize">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{plan.name}</span>
                </CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-green-500" />
                  <span>
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(Number(plan.budget))}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{plan.duration} days</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                    </span>
                  </p>
                  <div className="flex items-center space-x-2">
                    <Plane className="h-4 w-4 text-gray-500" />
                    <span>{plan.destination[0]?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hotel className="h-4 w-4 text-gray-500" />
                    <span>{plan.hotel[0]?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Bus className="h-4 w-4 text-gray-500" />
                    <span>{plan.transportation[0]?.type}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => joinPlan(plan._id)} disabled={isButtonDisabled(plan) || isLoading} className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  {getButtonText(plan)}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
