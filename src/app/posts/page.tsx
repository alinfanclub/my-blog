import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";
import printDate from "@/utils/printDate";
import Image from "next/image";
import Link from "next/link";
import { format, render, cancel, register } from "timeago.js";

const getAllPosts = async () => {
  const response = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post",
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export default async function PostsPage() {
  const { data: posts } = await getAllPosts().then((res) => {
    const date = res.data;
    return {
      ...res,
      createdAt: date,
    };
  });
  return (
    <section className="flex flex-col gap-4">
      {posts.map((post: Post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </section>
  );
}
