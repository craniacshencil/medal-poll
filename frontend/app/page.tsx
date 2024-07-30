/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/VaMPRUJ9bsa
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { storeCredentials } from "./actions";
import { createToast } from "./polling/page";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export interface FormData {
  username: string | undefined;
  password: string | undefined;
}

interface LoginResponse {
  username: string;
  password: string;
  message: string;
  redirect: string;
}

export default function Home() {
  const router = useRouter();
  const [isPassword, setIsPassword] = useState<string>("password");
  const [displaySvg, setdisplaySvg] = useState<string>("/see-pass.svg");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  function changeInputType() {
    if (isPassword == "password") {
      setIsPassword("text");
      setdisplaySvg("/hide-pass.svg");
    } else {
      setIsPassword("password");
      setdisplaySvg("/see-pass.svg");
    }
  }

  /**
   *This function is used to display toasts when login is successful
   *It also redirects you to the designated page
   */
  function loginSuccessful(data: LoginResponse) {
    // Create toasts according to redirect
    if (data.redirect == "polling") {
      createToast(`Hey ${data.username}`, "Choose wisely!");
    } else {
      createToast(`Welcome ${data.username}`, "Hey, you're here again?");
    }

    // Store in cookies and redirect
    storeCredentials(data.username, data.password);
    setTimeout(() => {
      router.push(`/${data.redirect}`);
    }, 800);
  }

  /**
   *This function is used to display toasts when login fails
   */
  function loginFailed(statusCode: number) {
    if (statusCode == 404) {
      createToast("Incorrect Username", "Enter valid username");
    } else {
      createToast("Incorrect Password", "Check your password");
    }
  }

  /**
   *This function submits login data to the backend.
   *Also receives response and reacts accordingly
   */
  async function submitLogin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const formData: FormData = { username, password };
    const loginURL: string = process.env.NEXT_PUBLIC_LOGIN as string;

    try {
      const response: Response = await fetch(loginURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const statusCode: number = response.status;
      if (statusCode >= 400) {
        loginFailed(statusCode);
      } else {
        const data: LoginResponse = await response.json();
        loginSuccessful(data);
      }
    } catch (err) {
      createToast("Server Error", "Oops! Something went wrong");
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your username and password below to access your account.
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="relative block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-primary placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Username"
            />
          </div>
          <div className="flex gap-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              value={password}
              type={isPassword}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="relative w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-primary placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
              placeholder="Password"
            />
            <Image
              onClick={changeInputType}
              src={displaySvg}
              width={20}
              height={20}
              alt="hide/see-pass.svg"
            />
          </div>
          <div>
            <Button type="submit" className="w-full" onClick={submitLogin}>
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
