"use client";

import { Post } from "@/types/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Post[]>();

  const router = useRouter();

  const serachInputRef = useRef<HTMLInputElement>(null);

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

  const handleResultEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (search === "") {
        alert("검색어를 입력해주세요");
        return false;
      }
      router.push(`/search/${search}`);
      setSearchResult([]);
    }
  };

  const handleSearchIconClick = () => {
    if (search === "") {
      alert("검색어를 입력해주세요");
      if (serachInputRef.current !== null) {
        serachInputRef.current.focus();
      }
      return false;
    }
    router.push(`/search/${search}`);
    setSearchResult([]);
  };

  return (
    <section className="relative">
      <div className="relative mx-auto dark:text-gray-600">
        <input className=" hidden" aria-hidden="true" />
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="search"
          name="search"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          onKeyDown={handleResultEnter}
          ref={serachInputRef}
        />
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-gray-400 hover:text-white transition-all rounded-full w-8 h-8 flex items-center justify-center"
          onClick={handleSearchIconClick}
        >
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
