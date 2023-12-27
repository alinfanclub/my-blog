import FeaturedPostFeed from "./_components/FeaturedPostFeed";

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
    <section className="flex flex-col gap-4">
      <h1>Featured Post</h1>
      <FeaturedPostFeed page={page} perPage={perPage} />
    </section>
  );
}
