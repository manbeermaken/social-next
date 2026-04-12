"use client"

import Link from "next/link";
import { type Post } from "@/lib/actions/posts";
import PostDate from "./PostDate";
import PostMenu from "./PostMenu";
import { useContext } from "react";
import { AppContext } from "./Providers"

export default function Post({ post }: {
    post: Post
}) {
    const { username, setUsername } = useContext(AppContext)

    return (
        <div className="px-5 pb-5 pt-2 border rounded-md w-full bg-gray-200">
            <div className="flex justify-between mb-2 text-sm">
                <div className="flex gap-1 items-center">
                    <Link href={`/u/${post.authorName}`} className="font-semibold">{post.authorName},</Link>
                    <PostDate createdAt={post.createdAt} updatedAt={post.updatedAt}/>
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
    )
}