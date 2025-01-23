"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add your authentication logic here (e.g., API call)

    // On successful authentication, redirect to the dashboard
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center text-gray-800">Create Your Account</h1>
        <p className="text-sm text-center text-gray-600 mt-2">Sign Up with your Email</p>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="font-semibold">Password</Label>
              
            </div>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="confirmPassword" className="font-semibold">Confirm Password</Label>
              
            </div>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Re-Enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#3CAE06]">
            Sign Up
          </Button>
        </form>
        {/* Sign-up Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Logo and Agreement Text */}
      <div className="mt-8 text-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
        <p className="text-sm text-gray-500 mt-6">
          By clicking continue, you agree to our{" "}<br />
          <Link href="/terms" className=" hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className=" hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
