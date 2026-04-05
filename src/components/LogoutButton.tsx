"use client";

import { Loader, LogOut } from "lucide-react";
import { useRef,useEffect } from "react";
import { logoutUser } from "@/lib/actions/auth";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <button 
            type="submit" 
            disabled={pending} 
            className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-md disabled:bg-red-400 disabled:cursor-not-allowed"
        >
            {pending ? <Loader className="animate-spin mx-auto" /> : 'Log out'}
        </button>
    );
}

export default function LogoutButton() {
    const dialogRef = useRef<HTMLDialogElement>(null);
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
        
        // If the mouse click coordinates are outside those dimensions, close it
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
            <div onClick={openLogoutModal} className="mb-10 flex gap-2 items-center hover:bg-gray-400 px-4 py-2 hover:cursor-pointer rounded-md">
                <LogOut size={32} />
                <span className="font-semibold scale-0 group-hover:scale-100 transition-all">Log out</span>
            </div>

            <dialog ref={dialogRef} onClose={handleDialogClose} onClick={handleBackdropClick} className="top-[20%] mx-auto p-6 rounded-lg backdrop:bg-black/50">
                <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
                <p className="mb-4">Are you sure you want to log out?</p>
                
                <form action={logoutUser} className="flex gap-4">
                    
                    <button 
                        type="button" 
                        onClick={closeLogoutModal} 
                        className="px-4 py-2 cursor-pointer bg-gray-200 rounded-md"
                    >
                        Cancel
                    </button>
                    <SubmitButton />
                </form>
            </dialog>
        </>
    );
}