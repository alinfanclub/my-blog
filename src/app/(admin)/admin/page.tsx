import DeleteButton from "@/components/DeleteButton";
import axios from "axios";
import Link from "next/link";
import { Cookies } from "react-cookie";

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

const isAdmin = async () => {
  await axios
    .get(
      "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth",
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res.data.user);
    });
};

export default async function AdminPage() {
  isAdmin();
  const { data: posts } = await getAllPosts();
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
