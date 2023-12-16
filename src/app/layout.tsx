import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import ScrollTop from "@/components/ScrollTop";
import Head from "next/head";
import { IoAnalytics } from "react-icons/io5";

const sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kim's Blog",
    template: "Kim's Blog | %s",
  },
  description: "Kim's Blog",
  keywords: ["Kim's Blog", "Next.js", "React", "JavaScript"],
};

export const viewport: Viewport = {
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.className}>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
      </Head>
      <body className="flex flex-col w-full">
        <AuthContextProvider>
          <DarkModeProvider>
            <Header />
            <main className="grow px-4 max-w-screen-xl mx-auto w-full">
              {children}
              <IoAnalytics />
            </main>
            <Footer />
            <ScrollTop />
          </DarkModeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
