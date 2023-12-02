"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Profile from "./Profile";
import { Cookies } from "react-cookie";
import axios from "axios";
import TypoWrite from "./TypoWrite";
import Logout from "./Logout";
import { useAuthContext } from "@/context/AuthContext";

export default function Header() {
  const { user, setUser, logout } = useAuthContext();

  const handlelogout = () => {
    logout();
  };

  return (
    <header className="flex items-center justify-between min-h-[108px] p-4">
      <div>
        <div className="text-primary-color  flex items-center justify-between text-xl font-semibold">
          <TypoWrite />
        </div>
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
