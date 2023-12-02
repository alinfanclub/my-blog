"use client";

import DeleteButton from "@/components/DeleteButton";
import { useAuthContext } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

type Post = {
  _id: string;
  title: string;
  content: string;
};

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios
      .get("https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post")
      .then((res) => {
        setPosts(res.data.data);
      });
  }, []);
  useEffect(() => {
    const cookies = new Cookies();
    const user = cookies.get("jwt");
    console.log(user);
    if (!user) {
      redirect("/login");
    }
  }, []);
  return (
    <div>
      <div>
        <Link href={"/admin/write"}>Create Post</Link>
      </div>
      {posts.map((post: Post) => (
        <div key={post._id} className="border">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <DeleteButton id={post._id} />
        </div>
      ))}
    </div>
  );
}
