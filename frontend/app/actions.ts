"use server";

import { cookies } from "next/headers";

export async function storeCredentials(username: string, password: string) {
  cookies().set("password", password);
  cookies().set("username", username);
}
