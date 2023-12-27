import { Post } from "@/types/post";
import printDate from "@/utils/printDate";
import Link from "next/link";
import { format } from "timeago.js";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.title}`}>
      <div
        className=" bg-opacity-30 p-2 transition-all duration-200 rounded-xl [&>div>div>h1]:hover:text-lime-700  [&>div>div>h1]:dark:hover:text-lime-500 hover:border-lime-700 dark:hover:border-lime-400 border border-gray-900"
        key={post._id}
      >
        <div className="p-4 w-full">
          <div className="flex items-center justify-between duration-200">
            <h1 className="text-2xl font-semibold -mt-1 transition-all">
              {post.title}
            </h1>
            <small className="text-sm ">{format(post.createdAt)}</small>
          </div>
          <p className="">{printDate(post.createdAt)}</p>
          <p className="mt-3  text-sm">{post.description}</p>
        </div>
      </div>
    </Link>
  );
}
