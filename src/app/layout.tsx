import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthContextProvider } from "@/context/AuthContext";
import { DarkModeProvider } from "@/components/DarkModeProvider";
import ScrollTop from "@/components/ScrollTop";
import Script from "next/script";

const sans = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kim's Blog",
    template: "Kim's Blog | %s",
  },
  description: "Kim's Blog",
  keywords: ["Kim's Blog", "Next.js", "React", "JavaScript"],
  verification: {
    google: "8wFmz0xlYGlT5-Ze1LZOA-IulqTDjfA8cVAbK6FGvNI",
  },
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
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
      />
      <Script id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
      
        gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');
        `}
      </Script>
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
