"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {signinApi} from "@/app/API/auth";
import { useDispatch } from "react-redux";
import { setVendor } from "@/redux/vendorSlice";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

 const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Sign-in handler logic
    try {
      const response = await signinApi(formValues.email, formValues.password);
      
      if (response.address){
        dispatch(setVendor(response));
        router.push("/dashboard");
      } else {
        router.push("/complete-profile");
      };

    } catch (error) {
      console.log(error); 
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
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
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
              <Link href="/forgot-password" className="text-sm hover:underline">
                Forgot Password?
              </Link>
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
          {/* Submit Button */}
          <Button
            type="submit"
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
