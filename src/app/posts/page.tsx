import PostCard from "@/components/PostCard";
import { Post } from "@/types/post";

const getAllPosts = async () => {
  const response = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post",
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export const metadata = {
  title: "Post List",
  description: "Post List page",
  keywords: "Post List",
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
