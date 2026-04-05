import { House, Plus, Target, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import ProfileButton from "./ProfileButton";

export default function Sidebar() {
    return (
        <nav className="text-xl relative">
            <div className="sticky top-0 flex flex-col justify-between h-screen group">
                <Link href="/" className="ml-4 mt-2 p-1 rounded-md cursor-pointer hover:bg-gray-400 w-fit">
                    <Target size={32} className="" />
                </Link>
                <ul className="flex flex-col gap-5">
                    <li >
                        <Link href="/" className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                            <House size={32} />
                            <span className="font-semibold scale-0 group-hover:scale-100 transition-all">Home</span>
                        </Link>
                    </li>
                    <li className="hover:bg-gray-400  hover:cursor-pointer rounded-md">
                        <Link href="/create" className="flex gap-2 items-center px-4 py-2">
                            <Plus size={32} />
                            <span className="font-semibold scale-0 group-hover:scale-100 transition-all">Create</span>
                        </Link>
                    </li>
                    {/* <li className="flex gap-2 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                        <User size={32} />
                        <span className="font-semibold scale-0 group-hover:scale-100 transition-all">Profile</span>
                    </li> */}
                    <ProfileButton />
                </ul>
                <LogoutButton />
            </div>
        </nav>
    )
}