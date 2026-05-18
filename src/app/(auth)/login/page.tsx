import LoginForm from "@/components/auth/LoginForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title:'Login',
    description:''
}

export default function Login() {
    return (
        <LoginForm />
    )
}