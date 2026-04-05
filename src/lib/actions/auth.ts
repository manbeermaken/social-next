"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type ActionState = {
  error: string | null;
};

export async function loginUser(prevState: ActionState, formData: FormData): Promise<ActionState>{
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    
    if (!username || !password) {
        return { error: "Missing credentials" };
    }
    
    try{
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

        if (!res.ok) {
            return { error: "Invalid username or password" };
        }

        const {accessToken,refreshToken} = await res.json()
        const cookieStore = await cookies()

        cookieStore.set('accessToken',accessToken,{
            httpOnly: true, 
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax', 
            path: '/', 
            maxAge: 14 * 60,
        })

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax',
            path: '/', 
            maxAge: 7 * 24 * 60 * 60, 
        })
        
        
    }  catch (err) {
        console.error(err);
        return { error: "Something went wrong" };
    }
    redirect("/")
}

export async function signupUser(prevFormData: ActionState, formData:FormData): Promise<ActionState>{
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    if (!username || !password) {
        return { error: "Missing credentials" };
    }   

    try{
        const res = await fetch(`${process.env.BACKEND_URL}/api/auth/signup`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })

        if (!res.ok) {
            const data = await res.json()
            return { error: data.message };
        }

        const {accessToken,refreshToken} = await res.json()
        const cookieStore = await cookies()

        cookieStore.set('accessToken',accessToken,{
            httpOnly: true, 
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax', 
            path: '/', 
            maxAge: 14 * 60,
        })

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax',
            path: '/', 
            maxAge: 7 * 24 * 60 * 60, 
        })
        
        
    }  catch (err) {
        console.error(err);
        return { error: "Something went wrong" };
    }
    redirect("/")

}

export async function logoutUser() {
    const cookieStore = await cookies();
    const refreshtoken = cookieStore.get('refreshToken')?.value;

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    if (refreshtoken) {
        try {
            await fetch(`${process.env.BACKEND_URL}/api/auth/logout`, {
                method: "DELETE",
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token:refreshtoken })
            });
        } catch (err) {
            console.error('Backend logout failed:', err);
        }
    }

    redirect('/login');
}