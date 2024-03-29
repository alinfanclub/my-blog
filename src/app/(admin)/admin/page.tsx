"use client";

import DeleteButton from "@/app/_components/DeleteButton";
import { useAuthContext } from "@/context/AuthContext";
import { Post } from "@/types/post";
import printDate from "@/utils/printDate";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get("https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post")
      .then((res) => {
        setPosts(res.data.data);
      });
  }, []);
  return (
    <>
      {user && (
        <div className="flex flex-col gap-4">
          <div>
            <Link href={"/admin/write"}>Create Post</Link>
          </div>
          <table className="w-full border table-fixed border-collapse">
            <colgroup>
              <col width="5%" />
              <col width="20%" />
              <col width="40%" />
              <col width="25%" />
              <col width="10%" />
            </colgroup>
            <thead>
              <tr>
                <th className="border">No.</th>
                <th className="border">제목</th>
                <th className="border">설명</th>
                <th className="border">날짜</th>
                <th className="border"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: Post, index) => (
                <tr
                  key={post._id}
                  className="border hover:text-lime-400 transition-all [&>td]:p-2"
                >
                  <td className="text-center">{index + 1}</td>
                  <td className="border text-center  text-ellipsis overflow-hidden">
                    <Link href={`/admin/write/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="border text-center text-ellipsis overflow-hidden">
                    {post.description}
                  </td>
                  <td className="border text-center">
                    {printDate(post.createdAt)}
                  </td>
                  <td className="border text-center hover:bg-red-600 hover:text-white">
                    <DeleteButton id={post._id} setPosts={setPosts} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
