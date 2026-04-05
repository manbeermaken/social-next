"use client"

import { createPost } from "@/lib/actions/posts"
import { Loader } from "lucide-react"
import { useActionState } from "react"

export default function CreateForm() {

    const [state, formAction, isPending] = useActionState(createPost, { error: null })

    const floatingLabel = `absolute text-sm left-2.5 top-1 pointer-events-none transition-all duration-200 font-semibold
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xl
                            peer-focus:top-1 peer-focus:text-sm peer-focus:translate-y-0`
    return (
        <div className="relative">
            {state?.error && (<div className="absolute top-0 right-2 font-semibold text-red-500 -translate-y-[150%]">{state.error}</div>)}
            <form action={formAction} className="flex flex-col gap-5">
                <div className="relative bg-white rounded-xl border-4 border-gray-300  hover:bg-gray-50 focus-within:border-gray-400">
                    <input type="text" name="title" id="title" placeholder=" " className="peer w-full pt-5 pb-2 px-2.5 rounded-md outline-0" />
                    <label htmlFor="title" className={floatingLabel}>Title</label>
                </div>
                <div className="bg-white rounded-xl border-4 border-gray-300  hover:bg-gray-50 focus-within:border-gray-400">
                    <textarea name="content" id="content" rows={10} placeholder="Body text" className="w-full p-2 outline-0 resize-none"></textarea>
                </div>
                <div className="flex justify-end mr-5 items-center">
                    <button disabled={isPending} type="submit" className="min-w-25 bg-gray-500 px-2 py-2 rounded-md cursor-pointer text-white font-semibold hover:bg-gray-400 disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {isPending ? <Loader className="animate-spin mx-auto" /> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    )
}