"use client";

import { useEffect } from "react";
import LoginPage from "@/components/LoginPage";

export default function Auth() {
  return (
    <main className="flex justify-center items-center p-7 container min-w-full min-h-full">
      <LoginPage />
    </main>
  );
}
