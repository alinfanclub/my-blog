import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";
import printDate from "@/utils/printDate";
import Link from "next/link";

const getAllPosts = async () => {
  const response = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/featured",
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export default async function Home() {
  const { data: posts } = await getAllPosts().then((res) => {
    const date = res.data;
    console.log(date);
    return {
      ...res,
      createdAt: date,
    };
  });
  return (
    <section className="flex flex-col gap-4">
      <h1>Featured Post</h1>
      {posts.map((post: Post) => (
        <PostCard post={post} key={post._id} />
      ))}
    </section>
  );
}
