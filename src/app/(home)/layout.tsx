import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import { jwtDecode } from "jwt-decode";
import { cookies, headers } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headersList = await headers()

  const token = headersList.get("x-access-token") || cookieStore.get("accessToken")?.value;

  let username = null;

  if (token) {
    try {
      const decoded: any = jwtDecode(token);
      username = decoded.username;
    } catch (error) {
      console.error("Invalid token rendering layout", error);
    }
  }

  return (
    <div className="grid grid-cols-[1fr_6fr_2fr] bg-gray-300 gap-4">
      <Providers initialUsername={username}>
        <Sidebar />
        {children}
        <Trending />
      </Providers>
    </div>
  );
}