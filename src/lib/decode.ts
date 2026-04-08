import { cookies, headers } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { cache } from "react";

export const getCurrentUsername = cache(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();

  const token = headersList.get("x-access-token") || cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
});