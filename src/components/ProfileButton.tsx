"use client"

import { User } from "lucide-react"
import { useContext } from "react"
import { AppContext } from "./Providers"
import Link from "next/link";

export default function ProfileButton() {
    const { username, setUsername } = useContext(AppContext)
    return (
        <li>
            <Link href={`/u/${username}`}
                className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                <User className="h-6 w-6 md:h-8 md:w-8" />
                <span className="max-md:hidden font-semibold scale-0 group-hover:scale-100 transition-all">Profile</span>
            </Link>
        </li>
    )
}