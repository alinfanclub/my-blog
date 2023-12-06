import { AuthContextProvider } from "@/context/AuthContext";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Cookies } from "react-cookie";

export async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const cookie = req.cookies.get("jwt");
    if (url.pathname.startsWith("/admin")) {
      let token = cookie;
      const curToken = await fetch(
        "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token?.value}`,
          },
        }
      ).then((res) => res.json());
      if (curToken.status !== "success") {
        return NextResponse.redirect(url.origin);
      }
    }
  } catch (error) {
    console.log("err: ", error);
  }
}

export const config = {
  matcher: ["/admin", "/admin/write", "/admin/write/:path*"],
};
middleware;
