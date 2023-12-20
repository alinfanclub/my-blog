import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

type Props = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

export default function TagInputComponent({ selected, setSelected }: Props) {
  const [tags, setTags] = useState<string[]>();
  const [searchedTag, setSearchedTag] = useState<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      if (value) {
        setSelected([...selected, value]);
        e.currentTarget.value = "";
        setSearchedTag(null);
      }
    }
    if (selected.length !== 0) {
      if (e.currentTarget.value === "" && e.key === "Backspace") {
        setSelected(selected.slice(0, -1));
      }
    }
    // control + z 시 지웠던 태그 복구
    if (e.ctrlKey && e.key === "z") {
      setSelected(selected.slice(0, -1));
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/tag"
      )
      .then((res) => setTags(res.data.data));
  }, []);

  const handleOnClick = (value: string) => {
    setSelected(selected.filter((tag) => tag !== value));
  };

  const handleTagListInput = (value: string) => {
    setSelected([...selected, value]);
    setSearchedTag(null);
    if (inputRef.current != null) inputRef.current.value = "";
  };

  const handleSearch = (e: any) => {
    if (tags && e.target.value.length >= 0) {
      const filteredTag = tags.filter(
        (tag) => tag.toLowerCase().indexOf(e.currentTarget.value) !== -1
      );
      setSearchedTag(filteredTag);
      if (e.target.value.length < 1) {
        setSearchedTag(null);
      }
      if (filteredTag.length == 0) {
        setSearchedTag(["검색결과가 없습니다"]);
      }
    }
  };

  const handleTagTab = (
    e: React.KeyboardEvent<HTMLInputElement>,
    value: string
  ) => {
    if (e.key == "Enter") {
      setSelected([...selected, value]);
      setSearchedTag(null);
      if (inputRef.current != null) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex w-full bg-white dark:bg-zinc-600 px-2 py-2 gap-4 flex-wrap rounded-xl border border-neutral-200  dark:border-none mb-4 ">
        {selected && (
          <ul className="flex gap-2 flex-wrap w-fit">
            {selected?.map((tag, i) => (
              <li
                key={`${tag}`}
                className="flex gap-4 items-center bg-neutral-200 dark:text-zinc-800 dark:bg-white px-2 rounded-2xl"
              >
                <p>{tag}</p>

                <span
                  className="cursor-pointer"
                  onClick={() => handleOnClick(tag)}
                >
                  <RxCrossCircled />
                </span>
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          className=" dark:text-whitetext-black outline-none bg-transparent flex-1"
          id="text"
          onKeyDown={handleOnKeyUp}
          onChange={handleSearch}
          placeholder="enter tags"
          ref={inputRef}
        />
      </div>
      {searchedTag && (
        <div className="absolute -bottom-fit translate-y-1 min-h-full max-h-48 overflow-y-scroll  right-0 w-full bg-white dark:text-gray-500 rounded-lg flex flex-col border-2 border-gray-300 divide-y p-2">
          {searchedTag.map((tag: string, i) => (
            <div
              className="py-2 px-4 hover:text-lime-500 outline-lime-500"
              key={tag}
              onClick={() => handleTagListInput(tag)}
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleTagTab(e, tag)
              }
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
