"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ClientLottieReact from "@/components/lottie-client/ClientLottie";
import Traveler from "../../../public/animations/TravelerAnimation.json";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordSame, setIsPasswordSame] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2nd, setPassword2nd] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setErrorMessage("");
    if (password !== password2nd) {
      setIsPasswordSame(false);
      setIsLoading(false);
      return;
    } else {
      setIsPasswordSame(true);
    }

    try {
      const register = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, username: name, password }),
        }
      );

      const data = await register.json();

      if (!register.ok) {
        setErrorMessage(data.message || "Registration failed");
        throw data;
      }

      setName("");
      setEmail("");
      setPassword("");
      setPassword2nd("");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-8">
        <motion.div
          className="w-full md:w-1/2 max-w-md mb-8 md:mb-0 md:mr-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-500">
                Join Us Today
              </CardTitle>
              <CardDescription>
                Create your account and start your journey
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={password2nd}
                    onChange={(event) => setPassword2nd(event.target.value)}
                    required
                  />
                  {!isPasswordSame && (
                    <p className="text-red-500 text-sm">
                      Passwords do not match. Please try again.
                    </p>
                  )}
                </div>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600"
                  type="submit"
                  disabled={isLoading}
                >
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
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <ClientLottieReact animationData={Traveler} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
