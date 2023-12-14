import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import ScrollTop from "@/components/ScrollTop";

const sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kim's Blog",
    template: "Kim's Blog | %s",
  },
  description: "Kim's Blog",
  keywords: ["Kim's Blog", "Next.js", "React", "JavaScript"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <body className="flex flex-col w-full">
        <AuthContextProvider>
          <DarkModeProvider>
            <Header />
            <main className="grow px-4 max-w-screen-xl mx-auto w-full">
              {children}
            </main>
            <Footer />
            <ScrollTop />
          </DarkModeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
