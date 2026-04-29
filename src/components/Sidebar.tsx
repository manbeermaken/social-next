import { House, Plus, Target, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";
import Menu from "./Menu";

export default function Sidebar() {
    return (
        <nav className="text-xl z-50 max-md:w-screen fixed bottom-0 md:sticky md:top-0 md:h-screen">
            <Menu />
            {/* <div className="flex w-full h-14 bg-white justify-center md:flex-col md:justify-between md:h-screen group">
                <Link href="/" className="hidden md:block ml-4 mt-2 p-1 rounded-md cursor-pointer hover:bg-gray-400 w-fit">
                    <Target className="w-8 h-8" />
                </Link>
                <ul className="flex w-full justify-around items-center md:flex-col md:items-stretch md:gap-5">
                    <li>
                        <Link href="/"
                            className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                            <House className="h-6 w-6 md:h-8 md:w-8" />
                            <span className="max-md:hidden font-semibold scale-0 group-hover:scale-100 transition-all">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/create"
                            className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                            <Plus className="h-6 w-6 md:h-8 md:w-8" />
                            <span className="max-md:hidden font-semibold scale-0 group-hover:scale-100 transition-all">Create</span>
                        </Link>
                    </li>
                    <ProfileButton />
                </ul>
                <LogoutButton />
            </div> */}
        </nav>
    )
}