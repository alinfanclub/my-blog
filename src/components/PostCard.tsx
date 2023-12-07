import { Post } from "@/types/post";
import printDate from "@/utils/printDate";
import Link from "next/link";
import { format } from "timeago.js";

export default function PostCard({ post }: { post: Post }) {
  console.log(post);
  return (
    <Link href={`/posts/${post.title}`}>
      <div
        className=" bg-opacity-30 p-2 transition duration-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
        key={post._id}
      >
        <div className="p-4 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold -mt-1">{post.title}</h2>
            <small className="text-sm ">{format(post.createdAt)}</small>
          </div>
          <p className="">{printDate(post.createdAt)}</p>
          <p className="mt-3  text-sm">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}
