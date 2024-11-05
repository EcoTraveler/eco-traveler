"use client";

import PPbuttons from "@/components/Paypal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";

const TokenPurchase: React.FC = () => {
  const [price, setPrice] = useState("");
  const [tokens, setTokens] = useState(0);
  const [statusToken, setStatusToken] = useState(true);
  const router = useRouter();
  const clerkId = useUser();
  const userId = clerkId.user?.id;

  const options = [
    { price: "5.00", tokens: 100, description: "100 Tokens" },
    { price: "10.00", tokens: 250, description: "200 Tokens (+50 Bonus)" },
  ];

  const handleFreeToken = async () => {
    try {
      const freeToken = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: userId,
            tokens: 5,
            freeToken: false,
          }),
        }
      );
      if (freeToken.ok) {
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

  const handleSuccess = async (details: any) => {
    console.log("Transaction completed by: ", details.payer.name.given_name);
    try {
      const setToken = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clerkId: userId, tokens }),
        }
      );
      if (setToken.ok) {
        toast({
          title: "Purchase Successful!",
          description: `You've successfully purchased ${tokens} tokens!`,
          variant: "default",
        });
        router.push("/");
      } else {
        throw new Error("Failed to set tokens after purchase");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to process your purchase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSelectOption = (option: {
    price: string;
    tokens: number;
    description: string;
  }) => {
    setPrice(option.price);
    setTokens(option.tokens);
  };

  useEffect(() => {
    const getTokenStatus = async () => {
      try {
        const status = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/setToken?userId=${userId}`,
          { method: "GET" }
        );
        const data = await status?.json();
        console.log(data);

        if (status.ok) {
          setStatusToken(data?.freeToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTokenStatus();
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Purchase Tokens
      </h1>

      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <Link
          href="/"
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow duration-200"
          aria-label="Back to Home"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowLeft className="w-6 h-6 text-green-500" />
          </motion.div>
        </Link>
      </motion.div>

      <div className="flex flex-col space-y-6">
        {statusToken ? (
          <button
            onClick={handleFreeToken}
            className="p-4 w-64 border-2 rounded-lg text-lg font-medium transition-colors duration-200 bg-green-500 text-white hover:bg-green-600"
          >
            Get 5 Free Tokens
          </button>
        ) : (
          options.map((option) => (
            <button
              key={option.price}
              onClick={() => handleSelectOption(option)}
              className={`p-4 w-64 border-2 rounded-lg text-lg font-medium transition-colors duration-200 ${
                price === option.price
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 border-blue-500 hover:bg-blue-100"
              }`}
            >
              ${option.price} - {option.description}
            </button>
          ))
        )}
      </div>

      {price && (
        <div className="mt-8">
          <PPbuttons amount={price} onSuccess={handleSuccess} />
        </div>
      )}
    </div>
  );
};

export default TokenPurchase;
