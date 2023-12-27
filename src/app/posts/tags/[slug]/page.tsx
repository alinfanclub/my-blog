import PostCard from "@/app/_components/PostCard";
import { Post } from "@/types/post";
import { Metadata, ResolvingMetadata } from "next";

const getPostsByTag = async (tag: string) => {
  const response = await fetch(
    `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/tag/${tag}`,
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tag = decodeURI(slug);
  return {
    title: `tag: ${tag}`,
    description: `${tag} Posts`,
    keywords: tag,
  };
}

export default async function TageDetailpage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const tag = decodeURI(slug);

  const { data: posts } = await getPostsByTag(tag);
  if (posts.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <h1 className="border-b pb-4">Tag: {tag} Posts</h1>
        <p>There is no post with this tag</p>
      </section>
    );
  }
  return (
    <section className="flex flex-col gap-4">
      <h1 className="border-b pb-4">Tag: {tag} Posts</h1>
      {posts
        .sort((a: Post, b: Post) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        })
        .map((post: Post) => (
          <PostCard post={post} key={post._id} />
        ))}
    </section>
  );
}
