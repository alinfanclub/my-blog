import printDate from "@/utils/printDate";
import Link from "next/link";

const getAllPosts = async () => {
  const response = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post",
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

type Post = {
  _id: string;
  title: string;
  content: string;
  description: string;
  createdAt: string;
};

export default async function PostsPage() {
  const { data: posts } = await getAllPosts().then((res) => {
    const date = res.data;
    console.log(date);
    return {
      ...res,
      createdAt: date,
    };
  });
  return (
    <div>
      {posts.map((post: Post) => (
        <Link href={`/posts/${post.title}`} key={post._id}>
          <div className="border">
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>{printDate(post.createdAt)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
