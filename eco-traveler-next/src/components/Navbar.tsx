"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-700 hover:text-green-600 transition-colors">
    {children}
  </Link>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
              <Image src="/assets/EcoTraveler.ico" alt="EcoTraveler Logo" width={40} height={40} className="rounded-full" />
              <h1 className="text-xl font-semibold text-green-600">EcoTraveler</h1>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <NavLink href="/destinations">Destinations</NavLink>
              <NavLink href="/plannings">List Plannings</NavLink>
              <NavLink href="/ai-recommendation">AI Recommendation</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/paypal">Pricing</NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-2">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <UserButton showName />
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button variant="default" className="bg-green-500 text-white hover:bg-green-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline" className="text-green-500 border-green-500 hover:bg-green-50">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-600 hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Home
            </Link>
            <Link href="/destinations" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Destinations
            </Link>
            <Link href="/plannings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              List Plannings
            </Link>
            <Link href="/ai-recommendation" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              AI Recommendation
            </Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              About
            </Link>
            <Link href="/paypal" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Pricing
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isSignedIn ? (
              <div className="flex items-center px-5 space-x-4">
                <span className="text-sm font-medium text-gray-700">{user?.firstName}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="space-y-2 px-5">
                <Link href="/sign-in" className="block">
                  <Button variant="default" className="w-full bg-green-500 text-white hover:bg-green-600">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up" className="block">
                  <Button variant="outline" className="w-full text-green-500 border-green-500 hover:bg-green-50">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
