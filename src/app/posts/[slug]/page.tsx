import Toc from "@/app/posts/_componets/Toc";
import hljs from "highlight.js";
import { remark } from "remark";
import html from "remark-html";
import "highlight.js/styles/github-dark-dimmed.css";
import printDate from "@/utils/printDate";
import Link from "next/link";
import { Metadata } from "next";
import cheerio from "cheerio";

const getPostDetail = async (slug: string) => {
  const response = await fetch(
    `https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/post/${slug}`,
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
  const { data: post } = await getPostDetail(slug);
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(","),
  };
}

export default async function PostDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { data: post } = await getPostDetail(slug);

  const content = post.content;

  const processedContent = await remark().use().use(html).process(post.content);
  let contentHtml = processedContent.toString();

  const $ = cheerio.load(contentHtml);

  // 모든 이미지 태그 찾기 및 크기 속성 추가
  $("img").each((i, el) => {
    if (i === 0) {
      $(el).attr("width", "800px");
      $(el).attr("height", "360px");
      $(el).attr("rel", "preload");
      return;
    }
    $(el).attr("width", "800px");
    $(el).attr("height", "360px");
    $(el).attr("loading", "lazy");
    $(el).attr("rel", "preload");
  });

  // 수정된 HTML 업데이트
  contentHtml = $.html();

  contentHtml = contentHtml.replace(
    /<pre><code class="language-(.*?)">(.*?)<\/code><\/pre>/gs,
    (match, lang, code) => {
      let Dcode = code.replace(/&lt;/g, "<");
      Dcode = Dcode.replace(/&gt;/g, ">");
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
    <section className="flex gap-4 w-full">
      <div
        key={post._id}
        className="flex-1 max-w-[800px] mx-auto w-full flex flex-col gap-8"
      >
        <article className="flex flex-col gap-4  text-center border-dotted border-b pb-2 border-black dark:border-white">
          <h1 className="text-4xl">{post.title}</h1>
          <time>{printDate(post.createdAt)}</time>
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
        </article>
        <article
          id="blogContent"
          className="prose dark:prose-invert lg:prose-lg xl:prose-xl mx-auto w-full pr prose-pre:p-0"
          dangerouslySetInnerHTML={{ __html: contentWithId }}
        ></article>
      </div>

      <aside className="hidden 2xl:block fixed top-[200px] right-[10%] w-[200px]">
        <Toc content={content} />
      </aside>
    </section>
  );
}
