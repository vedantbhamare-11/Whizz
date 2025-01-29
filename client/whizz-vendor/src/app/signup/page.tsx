"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signupApi } from "../API/auth";
import { toast } from "react-toastify";

export default function SignUp() {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await signupApi(formValues.email, formValues.password);
        if (response.success){
          router.push("/complete-profile");
          toast.success(response.message);
        };
  
      } catch (error: any) {
        toast.error(error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formValues.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password validation
    if (!formValues.password) {
      newErrors.password = "Password is required.";
    } else if (formValues.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Za-z]/.test(formValues.password) || !/\d/.test(formValues.password)) {
      newErrors.password = "Password must include letters and numbers.";
    }

    // Confirm password validation
    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
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
              name="email"
              placeholder="Enter your email"
              value={formValues.email}
              onChange={handleInputChange}
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
            </div>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          {/* Confirm Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="confirmPassword" className="font-semibold">
                Confirm Password
              </Label>
            </div>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-Enter your password"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#3CAE06] hover:bg-[#36A205] text-white">
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
          By clicking continue, you agree to our{" "}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
