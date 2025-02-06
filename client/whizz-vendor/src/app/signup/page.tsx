"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();

  // State for form inputs and errors
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    } else if (!/[A-Za-z]/.test(formValues.password) || !/\d/.test(formValues.password)) {
      newErrors.password = "Password must include letters and numbers.";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", formValues);
      router.push("/complete-profile");
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

      {/* Sign-up Card */}
      <div className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center text-gray-800">Create Your Account</h1>
        <p className="text-sm text-center text-gray-600 mt-2">Sign Up with your Email</p>
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
            <Label htmlFor="password" className="font-semibold">
              Password
            </Label>
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
          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-semibold">
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Re-Enter your password"
              value={formValues.confirmPassword}
              className="placeholder:text-sm text-sm lg:placeholder:text-md text-md"
              onChange={(e) =>
                setFormValues({ ...formValues, confirmPassword: e.target.value })
              }
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full bg-[#3CAE06] hover:bg-[#36A205] text-white"
          >
            Sign Up
          </Button>
        </form>
        {/* Sign-in Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/signin" className="text-black hover:underline">
              Login
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
