import { Post } from "@/types/post";

export default async function sitemap() {
  const baseUrl = "https://kimdevlog.vercel.app";

  const posts = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post"
  ).then((res) => res.json());

  const postUrls = posts.data.map((post: Post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.createdAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/posts`, lastModified: new Date() },
    ...postUrls,
  ];
}
