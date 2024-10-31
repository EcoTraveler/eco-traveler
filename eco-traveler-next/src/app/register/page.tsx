"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ClientLottieReact from "@/components/lottie-client/ClientLottie";
import Traveler from "../../../public/animations/TravelerAnimation.json";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    // Simulating an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        <motion.div className="w-full md:w-1/2 max-w-md mb-8 md:mb-0 md:mr-8" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ type: "spring", stiffness: 100, damping: 20 }}>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-500">Join Us Today</CardTitle>
              <CardDescription>Create your account and start your journey</CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" type="text" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-green-500 hover:bg-green-600" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating your account..." : "Create Account"}
                </Button>
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Log in here
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
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
