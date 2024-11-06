"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <NavLink href="/destinations">Destinations</NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-gray-700 hover:text-green-600 transition-colors flex items-center">
                    Plan <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/plannings" className="w-full">
                      List Plannings
                    </Link>
                  </DropdownMenuItem>
                  {isSignedIn && (
                    <DropdownMenuItem>
                      <Link href="/my-plan" className="w-full">
                        My Plan
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <NavLink href="/ai-recommendation">AI Recommendation</NavLink>
              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center space-x-4">
            {isSignedIn ? (
              <UserButton showName />
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
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500 hover:text-gray-600 hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/destinations">Destinations</NavLink>
            <div className="relative">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                Plan <ChevronDown className="h-4 w-4" />
              </button>
              <div className="pl-6 space-y-1">
                <NavLink href="/plannings">List Plannings</NavLink>
                {isSignedIn && <NavLink href="/my-plan">My Plan</NavLink>}
              </div>
            </div>
            <NavLink href="/ai-recommendation">AI Recommendation</NavLink>
            <NavLink href="/pricing">Pricing</NavLink>
            <NavLink href="/chat">My Room Chat</NavLink>
            <NavLink href="/about">About</NavLink>
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
