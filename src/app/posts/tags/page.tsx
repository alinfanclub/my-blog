import Link from "next/link";
import { type } from "os";

const getTagList = async () => {
  const response = await fetch(
    "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/tag",
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  return response.json();
};

export const metadata = {
  title: "Tag List",
  description: "Tag List",
  keywords: "Tag List",
};

export default async function tagListPasge() {
  const { data: tags } = await getTagList();
  console.log(tags);
  return (
    <section>
      <h1 className="border-b pb-4 mb-8">Tag List</h1>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
        {tags
          .sort((a: string, b: string) => {
            return a.localeCompare(b);
          })
          .map((tag: string) => (
            <Link href={`/posts/tags/${tag}`} key={tag}>
              <article className="w-full md:w-[60%] flex justify-center items-center h-20 mx-auto rounded-xl border hover:border-lime-500 dark:hover:text-lime-500 hover:text-lime-700">
                {tag}
              </article>
            </Link>
          ))}
      </section>
    </section>
  );
}
