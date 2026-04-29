"use client";

import { Loader, LogOut } from "lucide-react";
import { useRef, useEffect } from "react";
import { logoutUser } from "@/lib/actions/auth";
import { useFormStatus } from "react-dom";
import { motion } from 'motion/react'

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <motion.button
            type="submit"
            disabled={pending}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md disabled:bg-red-400 disabled:cursor-not-allowed"
            whileHover={!pending ? { scale: 1.05, y: -2 } : undefined}
            whileTap={!pending ? { scale: 0.9, y: 1, backgroundColor: "#b91c1c" } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
            {pending ? <Loader className="animate-spin mx-auto" /> : 'Log out'}
        </motion.button>
    );
}

export default function Logout() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const openLogoutModal = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
            // document.body.style.overflow = "hidden";
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
            <motion.div onClick={openLogoutModal} className="cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.9, y: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                <LogOut />
            </motion.div>

            <dialog ref={dialogRef} onClose={handleDialogClose} onClick={handleBackdropClick}
                className="m-0 mt-auto w-full max-w-full rounded-t-2xl rounded-b-none 
                md:top-[20%] md:mx-auto md:w-auto md:max-w-md p-6 md:rounded-lg backdrop:bg-black/50">
                <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
                <p className="mb-4">Are you sure you want to log out?</p>

                <form action={logoutUser} className="flex flex-col md:flex-row gap-4">

                    <motion.button
                        type="button"
                        onClick={closeLogoutModal}
                        className="px-4 py-2 cursor-pointer rounded-md bg-gray-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.9, y: 1, backgroundColor: "#d1d5db" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    >
                        Cancel
                    </motion.button>
                    <SubmitButton />
                </form>
            </dialog>
        </>
    );
}