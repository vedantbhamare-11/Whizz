'use client';

import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Add your sign-in logic here
    console.log("Sign-In form submitted", { email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              className="w-full"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Your password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full rounded "
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
