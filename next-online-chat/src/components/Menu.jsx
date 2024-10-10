import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import Messages from "./Messages";
import Users from "./Users";
import Link from "next/link";
import routes from "@/routes/routes";

const Menu = () => {
  return (
    <aside className="flex flex-col bg-transparent rounded-3xl w-1/3 min-w-60 p-4 m-2 drop-shadow-md backdrop-opacity-10 min-h-80">
      <Link
        href={routes.profilePage()}
        className="m-2 p-2 hover:bg-purple-700 rounded-md"
      >
        <UserIcon className="w-7 h-7 inline" />
        <span className="ml-4">Личный кабинет</span>
      </Link>
      <Users />
      <Messages />
    </aside>
  );
};

export default Menu;
