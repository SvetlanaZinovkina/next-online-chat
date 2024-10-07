'use client'

import { useEffect } from 'react';
import Menu from "@/components/Menu";
import Chat from "@/components/Chat";
import { socket } from "../socket";


export default function Home() {
  useEffect(() => {
    socket.on('connection', () => {
      console.log('Connected to server');
    });

    socket.on('message', (msg) => {
      console.log('Received message: ', msg);
    });

    return () => {
      socket.off('connection');
      socket.off('message');
    };
  }, []);


  return (
    <main className="flex flex-row p-7 container w-screen h-screen">
      <Menu/>
      <Chat/>
    </main>
  );
}
