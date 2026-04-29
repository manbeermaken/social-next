"use client"
import { type Post } from "@/lib/actions/posts"
import Link from "next/link"
import PostDate from "./PostDate"
import PostMenu from "./PostMenu"
import { AppContext } from "./Providers"
import { useContext, useEffect, useRef, useState } from "react"
import { redirect, useRouter } from "next/navigation"

export default function ModalPost({ post }: { post: Post }) {
    const [isPhone, setIsPhone] = useState(false)
    const { username, setUsername } = useContext(AppContext)
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
                <div className="flex justify-between mb-2 text-sm">
                    <div className="flex gap-1 items-center">
                        <Link href={`/u/${post.authorName}`} className="font-semibold">{post.authorName},</Link>
                        <PostDate createdAt={post.createdAt} updatedAt={post.updatedAt} />
                    </div>
                    <PostMenu myPost={username == post.authorName} postId={post._id} />
                </div>
                <div className="mb-5">
                    <Link href={`/p/${post._id}`} prefetch={false} className="text-2xl font-bold">{post.title}</Link>
                </div>
                <div className="">
                    <p>{post.content}</p>
                </div>
            </div>
        </dialog>
    )
}