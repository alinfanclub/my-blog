const getAllPosts = async () => {
  const response = await fetch('https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post');
  return response.json();
}

type Post = {
  _id: string;
  title: string;
  content: string;
}

export default  async function AdminPage() {
  const {data: posts} = await getAllPosts();
  return (
    <div>
      {posts.map((post: Post) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

