"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formValues.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formValues.password) {
      newErrors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted successfully:", formValues);
      router.push("/dashboard");
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 px-4 sm:px-0">
      {/* Mobile Logo (Visible only on small screens) */}
      <div className="mb-6 sm:hidden">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Sign-in Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center text-gray-800">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-semibold">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formValues.email}
              className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="font-semibold">
                Password
              </Label>
              <Link href="/forgot-password" className="text-sm hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formValues.password}
              className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
              onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#3CAE06] hover:bg-[#36A205] text-white"
          >
            Login
          </Button>
        </form>

        {/* Sign-up Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Desktop/Tablet Logo (Visible only on larger screens) */}
      <div className="mt-8 hidden sm:block">
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="mx-auto"
        />
      </div>

      {/* Agreement Text */}
      <div className="mt-6 text-center max-w-xs text-sm text-gray-500">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
