"use client"

import { Loader } from 'lucide-react'
import { type Post } from "@/lib/actions/posts"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function loading({ post }: { post: Post }) {
    const [isPhone, setIsPhone] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const router = useRouter()

    useEffect(() => {
        // if (window.innerWidth < 768) {
        //     setIsPhone(true)
        // } else {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal()
        }
        document.body.style.overflow = "hidden"
        // }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    const handleClose = () => {
        document.body.style.overflow = "unset";
        if (dialogRef.current) {
            dialogRef.current.close();
        }
        router.back()
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (!dialogRef.current) return;

        const dialogDimensions = dialogRef.current.getBoundingClientRect();

        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            document.body.style.overflow = "unset";
            // if (dialogRef.current) {
            //     dialogRef.current.close();
            // }
            router.back()
        }
    };

    return (
        <dialog ref={dialogRef} onClose={handleClose} onClick={handleBackdropClick} className="top-[20%] mx-auto w-[60%] rounded-lg backdrop:bg-black/50">
            <div className="px-5 pb-5 pt-2 border rounded-md w-full bg-gray-200">
                <Loader className='animate-spin w-6 h-6 md:w-8 md:h-8 flex justify-center'/>
            </div>
        </dialog>
    )
}