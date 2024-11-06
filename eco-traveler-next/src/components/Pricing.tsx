"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const PricingPlans = () => {
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

  const handleFreeTokenClick = () => {
    console.log("Free tokens clicked");
    // Add your logic here
  };

  const handlePurchaseSuccess = (plan: { name: any; price?: string; tokens?: number; features?: string[]; description?: string }) => {
    console.log(`Purchase successful for ${plan.name}`);
    // Add your logic here
  };

  return (
    <div className="max-w-6xl mx-auto pt-16">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-4">Choose Your Travel Plan</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Unlock the power of AI-driven travel recommendations</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-gray-200 transition-all duration-300 h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-green-700">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold text-gray-900 mb-4">
                  ${plan.price}
                  <span className="text-base font-normal text-gray-600"> / {plan.tokens} tokens</span>
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
                {plan.name === "Free Trial" ? (
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <Link href="/pricing">Go to pricing</Link>
                  </Button>
                ) : (
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    {" "}
                    <Link href="/pricing">Go to pricing</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
