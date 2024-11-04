"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignUp } from "@clerk/nextjs";
import ClientLottieReact from "@/components/lottie-client/ClientLottie";
import Traveler from "../../../../public/animations/TravelerAnimation.json";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        <motion.div className="w-full md:w-1/2 max-w-md mb-8 md:mb-0 md:mr-8" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-green-500 hover:bg-green-600",
                footerActionLink: "text-blue-600 hover:underline",
                headerTitle: "text-green-500",
                formFieldInput: "border-gray-300 focus:ring-green-500 focus:border-green-500",
                formFieldLabel: "text-gray-700",
                socialButtonsBlockButton: "border-gray-300 hover:bg-gray-50",
                socialButtonsBlockButtonText: "text-gray-700",
                footerActionText: "text-gray-600",
                footer: "hidden", // This line hides the footer
              },
              layout: {
                socialButtonsPlacement: "bottom",
                termsPageUrl: "https://clerk.com/terms",
              },
            }}
          />
          <div className="mt-4 text-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link href="/sign-in" className="text-green-500 hover:text-green-600 font-semibold">
              Sign in here
            </Link>
          </div>
        </motion.div>
        <motion.div className="w-full lg:w-1/2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 50, opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
          <div className="w-full h-full flex items-center justify-center">
            <ClientLottieReact animationData={Traveler} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
