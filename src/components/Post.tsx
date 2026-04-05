import Link from "next/link";
import { type Post } from "@/lib/actions/posts";

export default async function Post({post}:{
    post:Post
}) {
    return (
        <div key={post._id} className="p-5 border max-w-2xl rounded-md bg-gray-200">
            <Link href={`/p/${post._id}`} className="text-xl font-bold">{post.title}</Link>
            <div>
                <p>
                   {post.content} 
                </p>
            </div>
        </div>
    )
}