'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Profile from './Profile';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import TypoWrite from './TypoWrite';
import Logout from './Logout';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      axios.get('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth', {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user)
      }).catch((err) => {
        console.log(err)
      }
      )
  }
  ,[])

  const handlelogout = () => {
    setUser(null)
    axios.post('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/logout', {}, {
      withCredentials: true,
    })
  }

  return (
    <header className="flex items-center justify-between min-h-[108px] p-4">
      <div>
        <div className="text-primary-color  flex items-center justify-between text-xl font-semibold">
           <TypoWrite />
        </div>
      </div>
      <div className="flex items-center text-base leading-5">
        <nav className="flex items-center gap-4">
          <Link href='/about'>
              About
          </Link>
          <Link href="posts">
            Posts
          </Link>
          {user && (
            <>
            <Link href='/admin'>
              Admin
            </Link>
            <Logout logout={handlelogout}/>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

