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
    <header className="flex items-center justify-between min-h-[108px] p-4 max-w-screen-2xl mx-auto w-full">
      <div className="flex items-center gap-4">
        <div className="text-primary-color  flex items-center justify-between text-xl font-semibold">
          <TypoWrite />
        </div>
        <DarkModeButton />
      </div>
      <div className="flex items-center text-base leading-5">
        <nav className="flex items-center gap-4">
          <Link href="/about">About</Link>
          <Link href="/posts">Posts</Link>
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
