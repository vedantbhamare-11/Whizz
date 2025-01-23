"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { useRouter } from "next/navigation";

export default function SignIn() {
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
        <h1 className="text-xl font-bold text-center text-gray-800">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
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
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#3CAE06]">
            Login
          </Button>
        </form>
        {/* Sign-up Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-black hover:underline">
              Sign up
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
