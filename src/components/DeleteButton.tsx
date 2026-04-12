"use client";

import { Divide, Loader, Trash } from "lucide-react";
import { useRef, useActionState, useEffect } from "react";
import { deletePost } from "@/lib/actions/posts";
import { redirect } from "next/navigation";

export default function DeleteButton({ postId }: { postId: string }) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [state, formAction, isPending] = useActionState(deletePost, { error: null })

    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const openLogoutModal = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            document.body.style.overflow = "hidden";
        }
    };

    const closeLogoutModal = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };

    const handleDialogClose = () => {
        document.body.style.overflow = "unset";
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (!dialogRef.current) return;

        const dialogDimensions = dialogRef.current.getBoundingClientRect();

        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            closeLogoutModal();
        }
    };

    return (
        <>
            <li onClick={openLogoutModal} className="flex items-center gap-2 text-gray-700 hover:text-black cursor-pointer">
                <Trash size={16} /> Delete
            </li>

            <dialog ref={dialogRef} onClose={handleDialogClose} onClick={handleBackdropClick} className="top-[20%] mx-auto p-6 rounded-lg backdrop:bg-black/50">
                <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                <p className="mb-4">Are you sure you want to delete?</p>

                <form action={formAction} className="flex gap-4">
                    <input type="hidden" name="postId" value={postId} />
                    <button
                        type="button"
                        onClick={closeLogoutModal}
                        className="px-4 py-2 cursor-pointer bg-gray-200 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-md disabled:bg-red-400 disabled:cursor-not-allowed"
                    >
                        {isPending ? <Loader className="animate-spin mx-auto" /> : <div className="flex gap-1"><Trash /> Delete</div>}
                    </button>
                </form>
                <div className="flex justify-center mt-2">
                    {state.error && <div className="text-red-500 mt-2 text-base font-semibold">{state.error}</div>}
                </div>
            </dialog>
        </>
    );
}