"use server";

import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

// export type Result<T> = 
//     | { success: true; data: T }
//     | { success: false; error: string };

// export type ActionState<T> = {
//     data?: T;
//     error?: string | null;
// }
export type ActionState = {
    error: string | null;
}

export type Post = {
    _id:string;
    title:string;
    content:string;
    authorId:string;
    authorName:string;
    createdAt:string;
    updatedAt:string;
}

export async function fetchPosts(cursor: string | null){
    const fetchUrl = cursor ? `${process.env.BACKEND_URL}/api/posts?cursor=${cursor}` : `${process.env.BACKEND_URL}/api/posts`

    const cookieStore = await cookies()
    const headersList = await headers()
    const token = headersList.get("x-access-token") || cookieStore.get('accessToken')?.value

    if(!token){
        redirect('/login')
    }

    try{
        const data = await fetch(fetchUrl,{
            method: "GET",
            headers: {"Authorization":`Bearer ${token}`}
        })
        if (!data.ok) {
            console.error(`Backend returned status: ${data.status}`);
            return { error: 'Failed to fetch posts from server' }; 
        }
        
        return await data.json() 
    } catch(err) {
        console.log("Error in getting posts ",err)
        return {error:'Failed to get posts'}
    }
}

export async function createPost(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const cookieStore = await cookies()
    const headersList = await headers()
    const token = headersList.get("x-access-token") || cookieStore.get('accessToken')?.value

    if(!token){
        redirect('/login')
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string

    if(!title || !content){
        return {error:"Title and content are required."}
    }

    let newPostId: string

    try{
        const res = await fetch(`${process.env.BACKEND_URL}/api/posts`,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization":`Bearer ${token}`
            },
            body : JSON.stringify({ title, content })
        })
        
        const data = await res.json()

        if(!res.ok){
            return {error:data.message}
        }
        newPostId = data._id
    } catch (err) {
        console.log(err)
        return {error:"Something went wrong"}
    }

    revalidatePath('/')
    redirect(`/p/${newPostId}`)
}

export async function fetchUserPosts(cursor: string | null, username: string){
    const fetchUrl = cursor ? `${process.env.BACKEND_URL}/api/posts/user/${username}?cursor=${cursor}` 
                            : `${process.env.BACKEND_URL}/api/posts/user/${username}`

    const cookieStore = await cookies()
    const headersList = await headers()
    const token = headersList.get("x-access-token") || cookieStore.get('accessToken')?.value

    if(!token){
        redirect('/login')
    }

    try{
        const data = await fetch(fetchUrl,{
            method: "GET",
            headers: {"Authorization":`Bearer ${token}`}
        })
        if (!data.ok) {
            console.error(`Backend returned status: ${data.status}`);
            return { error: 'Failed to fetch posts from server' }; 
        }
        
        return await data.json() 
    } catch(err) {
        console.log("Error in getting posts ",err)
        return {error:'Failed to get posts'}
    }
}

export async function getPost(postId:string):Promise<ActionState|Post>{
    const cookieStore = await cookies()
    const headersList = await headers()
    const token = headersList.get("x-access-token") || cookieStore.get('accessToken')?.value

    if(!token){
        redirect('/login')
    }

   if(!postId) return {error:"Invalid post id format"}
   const fetchUrl = `${process.env.BACKEND_URL}/api/posts/${postId}`

   try{
        const res = await fetch(fetchUrl,{
            method: "GET",
            headers: {"Authorization":`Bearer ${token}`}
        })
        if (!res.ok) {
            console.error(`Backend returned status: ${res.status}`);
            return { error: 'Failed to fetch posts from server' }; 
        }
        return await res.json()
   } catch (err) {
        console.log(err)
        return {error:"Something went wrong"} 
   }
}

export async function updatePost(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const cookieStore = await cookies()
    const headersList = await headers()
    const token = headersList.get("x-access-token") || cookieStore.get('accessToken')?.value

    if(!token){
        redirect('/login')
    }

    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const postId = formData.get('postId') as string
    if(!title || !content || !postId){
        return {error:"Title and content are required."}
    }

    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`,{
            method:"PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Authorization":`Bearer ${token}`
            },
            body : JSON.stringify({ title, content })
        })
        const data = await res.json()

        if(!res.ok){
            return {error:data.message}
        }
    } catch (err) {
        console.log(err)
        return {error:"Something went wrong"}
    }

    revalidatePath('/')
    redirect(`/p/${postId}`)
}

export async function deletePost(prevState: ActionState, formData: FormData):Promise<ActionState>{
     const cookieStore = await cookies()
    const headersList = await headers()
    const token = headersList.get("x-access-token") || cookieStore.get('accessToken')?.value

    if(!token){
        redirect('/login')
    }
    const postId = formData.get('postId') as string
    if(!postId) {
        return {error:"please provide post id"}
    }
    try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`,{
            method:"DELETE",
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        const data = await res.json() 
        if(!res.ok){
            return {error:data.message}
        }
    } catch (err) {
        console.log(err)
        return {error:"Something went wrong"}
    }

   revalidatePath('/') 
   redirect('/')
}