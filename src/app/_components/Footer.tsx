import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32">
      <div className=" bg-zinc-950 text-white  text-center py-2 text-sm">
        <div className="mx-1">
          <Link href="/" className="link-underline">
            Kim Seoung Hun{` © ${new Date().getFullYear()}`}
          </Link>
        </div>
      </div>
    </footer>
  );
}
