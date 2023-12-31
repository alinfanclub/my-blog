import PerPageSelect from "@/app/_components/PerPageSelect";
import PostCard from "@/app/_components/PostCard";
import { Post } from "@/types/post";
import Link from "next/link";
import { redirect } from "next/navigation";

// const getAllPosts = async () => {
//   const response = await fetch(
//     "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post",
//     {
//       cache: "no-cache",
//     }
//   );
//   return response.json();
// };

const getAllPosts = async (page: number, perPage: number) => {
  const response = await fetch(
    `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/page?page=${page}&perPage=${perPage}`,
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

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const perPage =
    typeof searchParams.perPage === "string" ? Number(searchParams.perPage) : 5;

  const { data: posts, totalPage } = await getAllPosts(page, perPage);
  if (posts.length === 0) {
    redirect("/posts");
  }

  return (
    <section className="flex flex-col gap-4">
      <PerPageSelect page={page} />
      {posts.map((post: Post) => (
        <PostCard post={post} key={post._id} />
      ))}
      <div className="flex space-x-6 mx-auto">
        <Link
          href={{
            query: {
              page: page > 1 ? page - 1 : 1,
              perPage,
            },
          }}
          className={`
          ${page <= 1 && "pointer-events-none opacity-50"}
          rounded border  bg-gray-100  px-3 py-1  text-sm text-gray-800`}
        >
          Previous
        </Link>
        <p className="flex justify-center items-center">
          {page} / {totalPage}
        </p>
        <Link
          href={{
            query: {
              page: page + 1,
              perPage,
            },
          }}
          className={`${
            totalPage <= page && "pointer-events-none opacity-50"
          } rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800`}
        >
          Next
        </Link>
      </div>
    </section>
  );
}
