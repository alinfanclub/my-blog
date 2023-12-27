import PostCard from "./PostCard";

const getNewestPosts = async () => {
  const response = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/newest",
    {
      cache: "no-cache",
    }
  );

  return response.json();
};

export default async function NewestPostFeed() {
  const { data: post } = await getNewestPosts();
  return (
    <>
      <PostCard post={post} />
    </>
  );
}
