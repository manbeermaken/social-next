"use client"

import { loginUser } from "@/lib/actions/auth"
import { ArrowLeft, Eye, EyeOff, Loader } from "lucide-react"
import Link from "next/link"
import { useActionState, useState } from "react"

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [state, formAction, isPending] = useActionState(loginUser, { error: null })

    const floatingLabel = `absolute text-sm left-2.5 top-1 pointer-events-none transition-all duration-200 
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-xl
                            peer-focus:top-1 peer-focus:text-sm peer-focus:translate-y-0`


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    const inputType = isPasswordVisible ? "text" : "password"

    return (
        <div className="max-w-130 mx-auto rounded-2xl text-xl bg-gray-100 py-6">
            <div className="flex items-center ml-2 gap-2">
                <div className="p-1.5">
                    <ArrowLeft color="" size={24} />
                </div>
                <h1 className="font-bold">Log into Social</h1>
            </div>
            <form action={formAction} className="flex flex-col px-10 py-5 gap-10 items-stretch">
                <div className="relative bg-white">
                    <input required type="input" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder=" " className="peer w-full pt-5 py-2 px-2.5 rounded-md" />
                    <label htmlFor="username" className={floatingLabel}>Username</label>
                </div>
                <div className="relative bg-white">
                    <input type={inputType} name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder=" " className="peer w-full pt-5 py-2 px-2.5 rounded-md" />
                    <label htmlFor="password" className={floatingLabel}>Password</label>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <Eye /> : <EyeOff />}
                    </span>
                </div>
                {state?.error && 
                <div className="bg-red-100 border border-red-300 py-3 text-center font-medium rounded-md">
                    {state.error}
                </div>}
                <div className="flex flex-col items-stretch gap-3">
                    <button disabled={isPending} type="submit" className="cursor-pointer bg-gray-400 py-3 rounded-md hover:bg-gray-300 
                        disabled:bg-gray-300 disabled:cursor-not-allowed">
                        {isPending ? <Loader className="animate-spin mx-auto"/> : 'Log in'}
                    </button>
                    <button className="cursor-pointer bg-gray-100 py-3 rounded-md hover:bg-white">Forgot password?</button>
                    <Link href="/signup" className="cursor-pointer bg-white border-2 border-gray-400 py-3 rounded-md hover:bg-gray-50 text-center">
                        Create new account
                    </Link>
                </div>
            </form>
        </div>
    )
}