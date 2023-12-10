"use client";
import React from "react";
import Link from "next/link";
import TypoWrite from "./TypoWrite";
import Logout from "./Logout";
import { useAuthContext } from "@/context/AuthContext";
import DarkModeButton from "./DarkMode";

export default function Header() {
  const { user, setUser, logout } = useAuthContext();

  const handlelogout = () => {
    logout();
  };

  return (
    <header className="md:flex-row flex-col flex items-center justify-between md:min-h-[108px] h-fit p-4 max-w-screen-xl mx-auto w-full gap-4 border-b md:border-none mb-8 border-dashed ">
      <div className="flex items-center gap-4 md:flex-row flex-col  ">
        <div className="text-primary-color  flex items-center justify-between text-xl font-semibold">
          <TypoWrite />
        </div>
        <DarkModeButton />
      </div>
      <div className="flex items-center text-base leading-5">
        <nav className="flex items-center gap-4">
          <Link href="/about">About</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/posts/tags">Tags</Link>
          {user && (
            <>
              <Link href="/admin">Admin</Link>
              <Logout logout={handlelogout} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
