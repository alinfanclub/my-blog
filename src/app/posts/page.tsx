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
};
export default async function PostsPage() {
  const { data: posts } = await getAllPosts();
  return (
    <div>
      {posts.map((post: Post) => (
        <Link href={`/posts/${post.title}`} key={post._id}>
          <div className="border">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
