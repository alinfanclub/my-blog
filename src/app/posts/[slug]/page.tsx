import DeleteButton from "@/components/DeleteButton";

const getPostDetail = async (slug: string) => {
  const response = await fetch(
    `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/${slug}`,
    {
      cache: "no-cache",
    }
  );
  return response.json();
};

export default async function PostDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data: post } = await getPostDetail(slug);
  console.log(post);
  return (
    <div>
      <div key={post._id} className="">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
