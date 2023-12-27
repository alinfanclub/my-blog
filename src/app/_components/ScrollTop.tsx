"use client";

import { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
export default function ScrollTop() {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // if the user scrolls down, show the button
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
    };
    // listen for scroll events
    window.addEventListener("scroll", toggleVisibility);

    // clear the listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <button
        type="button"
        title="Scroll to top"
        onClick={scrollToTop}
        className={`fixed bottom-4 right-4 rounded-full p-2 outline-none transition-opacity duration-200 text-4xl ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <FaArrowAltCircleUp />
      </button>
    </div>
  );
}
