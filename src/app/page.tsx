import FeaturedPostFeed from "./_components/FeaturedPostFeed";
import NewestPostFeed from "./_components/NewestPostFeed";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    perPage?: string;
  };
}) {
  const page = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 5;

  return (
    <section className="flex flex-col gap-8">
      <article>
        <h1 className="mb-4">New Post</h1>
        <NewestPostFeed />
      </article>
      <article>
        <h1>Featured Post</h1>
        <FeaturedPostFeed page={page} perPage={perPage} />
      </article>
    </section>
  );
}
