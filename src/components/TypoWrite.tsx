'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Typewriter from 'typewriter-effect';


export default function TypoWrite() {
  const pathname = usePathname();
  return (
    <><Link href="/">
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
    </Link>
    </>
  );
}

