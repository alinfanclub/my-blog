'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typewriter from 'typewriter-effect';
import Profile from './Profile';
import { Cookies } from 'react-cookie';
import axios from 'axios';

export default function Header() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
      axios.get('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        setUser(res.data.user)
      }).catch((err) => {
        console.log(err)
      }
      )
  }
  ,[])

  return (
    <header className="flex items-center justify-between min-h-[108px] p-4">
      <div>
        <div className="text-primary-color  flex items-center justify-between text-xl font-semibold">
          <Link href='/'  passHref legacyBehavior>
            <a>
            {(pathname === '/') ? <Typewriter
              options={{
                strings: "Kim's Blog",
                autoStart: true,
                loop: false,
                deleteSpeed: 100000,
                delay: 0,
              }}
            /> : <Typewriter
            options={{
              strings: [`~${pathname} `],
              autoStart: true,
              loop: false,
              deleteSpeed: 100000,
              delay: 0
            }}
          />}
            </a>
          </Link>
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
            <Link href='/admin'>
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

