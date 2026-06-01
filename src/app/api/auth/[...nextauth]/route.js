import { handlers } from "@/auth/auth";
import { basePath } from "@/config/base-path";
import { NextRequest } from "next/server";

function reqWithBasePath(req) {
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host =
    req.headers.get("x-forwarded-host") ??
    req.headers.get("host") ??
    req.nextUrl.host;
  const baseUrl = new URL(`${proto}://${host}`);
  const urlWithBasePath = new URL(
    `${basePath}${req.nextUrl.pathname}${req.nextUrl.search}`,
    baseUrl
  );

  return new NextRequest(urlWithBasePath.toString(), req);
}

export const GET = (req) => handlers.GET(reqWithBasePath(req));
export const POST = (req) => handlers.POST(reqWithBasePath(req));
