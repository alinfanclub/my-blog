"use client";

import { useAuthContext } from "@/context/AuthContext";
import { loginUser } from "@/features/auth/userSlice";
import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const { login } = useAuthContext();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handelPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handelPasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
