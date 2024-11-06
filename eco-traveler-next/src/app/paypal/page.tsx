"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import PPbuttons from "@/components/Paypal";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [statusToken, setStatusToken] = useState(true);
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  const plans = [
    {
      name: "Free Trial",
      price: "0",
      tokens: 5,
      features: ["Access to basic features", "5 AI-powered recommendations", "24/7 customer support"],
      description: "Perfect for trying out our service",
    },
    {
      name: "Basic",
      price: "5.00",
      tokens: 100,
      features: ["All Free Trial features", "100 AI-powered recommendations", "Priority customer support"],
      description: "Great for occasional travelers",
    },
    {
      name: "Pro",
      price: "10.00",
      tokens: 250,
      features: ["All Basic features", "250 AI-powered recommendations", "Exclusive travel deals", "Personal travel consultant"],
      description: "Ideal for frequent travelers",
    },
  ];

  useEffect(() => {
    const getTokenStatus = async () => {
      try {
        const status = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken?userId=${userId}`, { method: "GET" });
        const data = await status?.json();
        if (status.ok) {
          setStatusToken(data?.freeToken);
        }
      } catch (error) {
        console.error("Failed to get token status:", error);
      }
    };
    if (userId) getTokenStatus();
  }, [userId]);

  const handleFreeToken = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: userId, tokens: 5, freeToken: false }),
      });
      if (response.ok) {
        toast({
          title: "Success!",
          description: "You've received 5 free tokens!",
          variant: "default",
        });
        router.push("/");
      } else {
        throw new Error("Failed to get free tokens");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get free tokens. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSuccess = async (details: any, plan: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: userId, tokens: plan.tokens }),
      });
      if (response.ok) {
        toast({
          title: "Purchase Successful!",
          description: `You've successfully purchased ${plan.tokens} tokens!`,
          variant: "default",
        });
        router.push("/");
      } else {
        throw new Error("Failed to set tokens after purchase");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to process your purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="absolute top-4 left-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6 text-green-600" />
          </Button>
        </Link>
      </motion.div>

      <div className="max-w-6xl mx-auto pt-16">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-4">Choose Your Travel Plan</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Unlock the power of AI-driven travel recommendations</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <Card key={plan.name} className={`${selectedPlan === plan.name ? "border-green-500 shadow-lg" : "border-gray-200"} transition-all duration-300`}>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-700">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-gray-900 mb-4">
                  ${plan.price}
                  <span className="text-base font-normal text-gray-600"> / {plan.tokens} token</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                {plan.name === "Free Trial" && statusToken ? (
                  <Button onClick={handleFreeToken} className="w-full bg-green-500 hover:bg-green-600 text-white">
                    Get {plan.tokens} Free Tokens
                  </Button>
                ) : (
                  plan.name !== "Free Trial" && <PPbuttons amount={plan.price} onSuccess={(details: any) => handleSuccess(details, plan)} />
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
