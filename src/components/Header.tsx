'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typewriter from 'typewriter-effect';

export default function Header() {
  const pathname = usePathname();

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
        </nav>
      </div>
    </header>
  );
}

