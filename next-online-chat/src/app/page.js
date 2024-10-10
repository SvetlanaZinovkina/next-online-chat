"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Menu from "@/components/Menu";
import Chat from "@/components/Chat";
import { socket } from "../socket";
import routes from "@/routes/routes";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) router.push(routes.signUpPage());

    socket.on("connection", () => {
      console.log("Connected to server");
    });

    socket.on("message", (msg) => {
      console.log("Received message: ", msg);
    });

    return () => {
      socket.off("connection");
      socket.off("message");
    };
  }, []);

  return (
    <main className="flex flex-row p-7 container w-screen h-screen">
      <Button />
      <Menu />
      <Chat />
    </main>
  );
}
