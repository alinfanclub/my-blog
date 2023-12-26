"use client";

import { usePathname, useRouter } from "next/navigation";

export default function PerPageSelect({ page }: { page: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const handelPerPageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = e.target.value;
    router.push(`${pathname}?page=${page}&perPage=${perPage}`);
  };
  return (
    <div className="flex gap-4 items-center justify-end">
      <label htmlFor="selectPage">페이지당 게시글 수</label>
      <select
        name="selectPage"
        title="selectPage"
        onChange={handelPerPageSelect}
      >
        <option value="5" defaultChecked>
          5
        </option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  );
}
