"use client";

import DeleteButton from "@/components/DeleteButton";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Cookies } from "react-cookie";

type Post = {
  _id: string;
  title: string;
  content: string;
};

export default function AdminPage() {
  const cookies = new Cookies();
  const cookie = cookies.get("jwt");
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthContext();

  // useEffect(() => {
  //   // if (user.email !== process.env.NEXT_PUBLIC_EMAIL) {
  //   //   alert("로그인이 필요합니다.");
  //   //   redirect("/");
  //   // }
  //   if (!user) {
  //     alert("로그인이 필요합니다.");
  //     redirect("/");
  //   }
  // }, []);

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
        <div>
          <div>
            <Link href={"/admin/write"}>Create Post</Link>
          </div>
          {posts.map((post: Post) => (
            <div key={post._id} className="border">
              <h1>{post.title}</h1>
              <p>{post.content}</p>
              <DeleteButton id={post._id} setPosts={setPosts} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
