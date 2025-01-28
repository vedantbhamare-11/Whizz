"use client";

import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const isAuth = useSelector((state: any) => state.vendor.isAuth);

  // Redirect to /signin
  redirect( isAuth ? "/dashboard" : "/signin");
}
