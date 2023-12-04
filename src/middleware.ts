import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { Cookies } from "react-cookie";

export async function middleware(req: NextRequest) {
  try {
    const url = req.nextUrl.clone();
    const cookie = req.cookies.get("jwt");

    if (url.pathname === "/admin" || url.pathname === "/admin/write") {
      let token;
      if (cookie) {
        token = cookie;
      }

      if (!token) {
        return NextResponse.redirect(url.origin);
      }
    }
  } catch (error) {
    console.log("err: ", error);
  }
}
middleware;
