"use client"

import { User } from "lucide-react"
import { useContext } from "react"
import { AppContext } from "./Providers"
import Link from "next/link";

export default function ProfileButton() {
    const {username,setUsername} = useContext(AppContext)
    return (
        <li className="hover:bg-gray-400 hover:cursor-pointer rounded-md">
            <Link href={`/u/${username}`} className="flex gap-2 items-center px-4 py-2">
                <User size={32} />
                <span className="font-semibold scale-0 group-hover:scale-100 transition-all">Profile</span>
            </Link>
        </li>
    )
}