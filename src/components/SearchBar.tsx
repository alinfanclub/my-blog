"use client";

import { Post } from "@/types/post";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Post[]>();

  useEffect(() => {
    if (search.length > 0) {
      fetch(
        `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/search/${search}`
      )
        .then((res) => res.json())
        .then((res) => {
          const { data } = res;
          setSearchResult(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setSearchResult([]);
    }
  }, [search]);

  const handleResultClick = () => {
    setSearchResult([]);
    setSearch("");
  };

  return (
    <section className="relative">
      <div className="pt-2 relative mx-auto dark:text-gray-600">
        <input className=" hidden" aria-hidden="true" />
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <div className="absolute right-0 top-0 mt-5 mr-4">
          <IoSearchSharp />
        </div>
      </div>
      {searchResult && searchResult.length > 0 && (
        <div className="absolute -bottom-fit translate-y-1 min-h-full max-h-48 overflow-y-scroll  right-0 w-full bg-white dark:text-gray-500 rounded-lg flex flex-col border-2 border-gray-300 divide-y">
          {searchResult?.map((result) => (
            <div key={result._id} className="py-2 px-4 hover:text-lime-500">
              <Link href={`/posts/${result.title}`} onClick={handleResultClick}>
                {result.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
