import { RxCrossCircled } from "react-icons/rx";

type Props = {
  selected: string[];
  setSelected: (selected: string[]) => void;
};

export default function TagInputComponent({ selected, setSelected }: Props) {
  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      if (value) {
        setSelected([...selected, value]);
        e.currentTarget.value = "";
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

  const handleOnClick = (value: string) => {
    setSelected(selected.filter((tag) => tag !== value));
  };
  return (
    <div className="flex w-full bg-white dark:bg-zinc-600 px-2 py-2 gap-4 flex-wrap rounded-xl border border-neutral-200  dark:border-none mb-4">
      {selected && (
        <ul className="flex gap-2 flex-wrap w-fit">
          {selected?.map((tag) => (
            <li
              key={tag}
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
        placeholder="enter tags"
      />
    </div>
  );
}
