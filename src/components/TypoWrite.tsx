"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Typewriter from "typewriter-effect";

export default function TypoWrite() {
  const pathname = usePathname();
  const decodeStr = decodeURI(pathname);
  return (
    <>
      <Link href="/">
        {decodeStr === "/" ? (
          <Typewriter
            options={{
              strings: "Kim's Blog",
              autoStart: true,
              loop: false,
              deleteSpeed: 100000,
              delay: 0,
            }}
          />
        ) : (
          <Typewriter
            options={{
              strings: [`~${decodeStr} `],
              autoStart: true,
              loop: false,
              deleteSpeed: 100000,
              delay: 0,
            }}
          />
        )}
      </Link>
    </>
  );
}
