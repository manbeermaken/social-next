import { Target } from "lucide-react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative h-screen">
            <div className="bg-white w-screen h-[10vh]"></div>
            {children}
            <footer className="absolute h-[10vh] bg-gray-400 bottom-0 w-full">
                <Target color="white"/>
            </footer>
        </div>
    );
}