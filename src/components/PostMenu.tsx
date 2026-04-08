"use client"

import { Bookmark, Ellipsis, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"
import DeleteButton from "./DeleteButton";

export default function PostMenu({ myPost,postId }: { 
    myPost: boolean;
    postId: string;
}) {
    const [isOpen, setIsOpen] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the menu is open, the ref exists, AND the click was outside the ref
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false) // Close the menu
            }
        }

        // Add the listener to the document
        document.addEventListener("mousedown", handleClickOutside)

        // Cleanup function: remove the listener when the component unmounts
        // or when the effect re-runs to prevent memory leaks.
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative" ref={menuRef}>
            <div className="">
                <button onClick={toggleMenu} className="cursor-pointer p-1 hover:bg-gray-300 rounded-full">
                    <Ellipsis />
                </button>
            </div>
            {isOpen && myPost && (
                <ul className="absolute right-0 top-full mt-1 w-32 bg-gray-300 p-3 rounded-md flex flex-col gap-3 z-10 shadow-lg border border-gray-400 text-xl">
                    <li className="text-gray-700 hover:text-black cursor-pointer">
                        <Link href={`/p/${postId}/edit`} className="flex items-center gap-2">
                            <Pencil size={16} /> Edit
                        </Link>
                    </li>
                    {/* <li className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
                        <Trash size={16} /> Delete
                    </li> */}
                    <DeleteButton postId={postId}/>
                    <li className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
                        <Bookmark size={16} /> Save
                    </li>
                </ul>
            )}
            {isOpen && !myPost && (
                <ul className="absolute right-0 top-full mt-1 w-32 bg-gray-300 p-3 rounded-md flex flex-col gap-3 z-10 shadow-lg border border-gray-400 text-xl">
                    <li className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
                        <Bookmark size={16} /> Save
                    </li>
                </ul>
            )}
        </div>
    )
}