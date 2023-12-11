import DeleteButton from "@/components/DeleteButton";
import Toc from "@/components/Toc";
import hljs from "highlight.js";
import Markdown from "react-markdown";
import { remark } from "remark";
import html from "remark-html";
import "highlight.js/styles/github-dark-dimmed.css";
import printDate from "@/utils/printDate";
import Link from "next/link";
import { Editor } from "@/components/Eduitor";
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

  const content = post.content;

  const processedContent = await remark().use(html).process(post.content);
  let contentHtml = processedContent.toString();

  contentHtml = contentHtml.replace(
    /<pre><code class="language-(.*?)">(.*?)<\/code><\/pre>/gs,
    (match, lang, code) => {
      const Dcode = code.replace(/&#x3C;/g, "<");
      let highlightedCode = hljs.highlight(Dcode, { language: lang }).value;
      return `<pre><code class="hljs ${lang}">${highlightedCode}</code></pre>`;
    }
  );

  const contentWithId = contentHtml.replace(
    /<h([1-3])>([^<]+)<\/h[1-3]>/g,
    (_, level: string, title: string) => {
      const id = title.replace(/ /g, "-");
      return `<h${level} id=${id}>${title}</h${level}>`;
    }
  );

  return (
    <div className="flex gap-4 w-full">
      <div
        key={post._id}
        className="flex-1 max-w-[800px] mx-auto w-full flex flex-col gap-8"
      >
        <div className="flex flex-col gap-4  text-center">
          <h1 className="">{post.title}</h1>
          <p>{printDate(post.createdAt)}</p>
          <div className="flex gap-4  flex-wrap justify-center">
            {post.tags.map((tag: string) => (
              <Link
                href={`/posts/tags/${tag}`}
                key={tag}
                className="dark:hover:text-lime-500 hover:text-lime-700 transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
        <div
          id="blogContent"
          dangerouslySetInnerHTML={{ __html: contentWithId }}
        ></div>
      </div>

      <div className="hidden 2xl:block fixed top-[200px] right-[10%] w-[200px]">
        <Toc content={content} />
      </div>
    </div>
  );
}
