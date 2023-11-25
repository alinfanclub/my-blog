'use client';

import { loginUser } from "@/features/auth/userSlice";
import axios from "axios";
import { useState } from "react";
import {Cookies} from 'react-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const cookies = new Cookies();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/login
    axios.post(' https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/login', {
      email,
      password
    },{
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }}).then((res) => {
      console.log(res.data.data._id)
      cookies.set("jwt", res.data.token, {path: "/"})
    }).catch((err) => {
      console.log(err);
    })

  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
   
  const handelPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"  onChange={handleEmailChange}/>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"  onChange={handelPasswordChange}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

