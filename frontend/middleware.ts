import { FormData } from "@/app/page";
import { NextResponse, type NextRequest } from "next/server";

export default async function validateCredentials(request: NextRequest) {
  const username = request.cookies.get("username")?.value;
  const password = request.cookies.get("password")?.value;

  const formData: FormData = { username, password };
  const loginURL: string = process.env.NEXT_PUBLIC_LOGIN as string;

  try {
    const response: Response = await fetch(loginURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.status == 200) {
      return NextResponse.next();
    }
    return NextResponse.rewrite(new URL("/", request.url));
  } catch (err) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/polling", "/submission"],
};
