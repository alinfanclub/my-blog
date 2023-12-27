import PostCard from "@/app/_components/PostCard";
import { Post } from "@/types/post";

const getSearchedData = async (slug: string) => {
  const response = await fetch(
    `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/search/${slug}`,
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export default async function SearchResultPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const decodeStr = decodeURI(slug);
  const { data: searchedPost } = await getSearchedData(slug);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="border-b pb-4">
        {`Searched by : `}
        <strong>{`"${decodeStr}"`}</strong> {`Keyword`}
      </h1>
      {searchedPost
        .sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((post: Post) => (
          <PostCard post={post} key={post._id} />
        ))}
    </section>
  );
}
