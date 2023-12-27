import FeaturedPostFeed from "./_components/FeaturedPostFeed";

export default async function Home() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Featured Post</h1>
      <FeaturedPostFeed />
    </section>
  );
}
