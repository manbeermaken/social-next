"use client"

import { House, Plus, Target, User } from "lucide-react"
import Link from "next/link"
import LogoutButton from "./LogoutButton"
import { motion } from 'motion/react'
import { useContext } from "react"
import { AppContext } from "./Providers"

const Menu = () => {
    const { username, setUsername } = useContext(AppContext)
    return (
        <div className="flex w-full h-14 bg-white justify-center md:flex-col md:justify-between md:h-screen group">
            <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.9, y: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                <Link href="/" className="hidden md:block ml-4 mt-2 p-1 rounded-md cursor-pointer hover:bg-gray-400 w-fit">
                    <Target className="w-8 h-8" />
                </Link>
            </motion.div>
            <ul className="flex w-full justify-around items-center md:flex-col md:items-stretch md:gap-5">
                <motion.li
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.9, y: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <Link href="/"
                        className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                        <House className="h-6 w-6 md:h-8 md:w-8" />
                        <span className="max-md:hidden font-semibold scale-0 group-hover:scale-100 transition-all">Home</span>
                    </Link>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.9, y: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <Link href="/create"
                        className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                        <Plus className="h-6 w-6 md:h-8 md:w-8" />
                        <span className="max-md:hidden font-semibold scale-0 group-hover:scale-100 transition-all">Create</span>
                    </Link>
                </motion.li>
                <motion.li
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.9, y: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                    <Link href={`/u/${username}`}
                        className="flex gap-3 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                        <User className="h-6 w-6 md:h-8 md:w-8" />
                        <span className="max-md:hidden font-semibold scale-0 group-hover:scale-100 transition-all">Profile</span>
                    </Link>
                </motion.li>
            </ul>
            <LogoutButton />
        </div>
    )
}

export default Menu