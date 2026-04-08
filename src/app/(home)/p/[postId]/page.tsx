import Post from "@/components/Post"
import { getPost, type ActionState } from "@/lib/actions/posts"

export default async function singlePost({ params }: {
    params: Promise<{ postId: string }>
}) {
    const postId = (await params).postId
    const post = await getPost(postId)
    if(post && typeof post === "object" && "error" in post){
        return <p>post not found</p>
    }

    return (
        <div className="w-[80%] mx-auto mt-[10vh]">
            <Post post={post}></Post>
        </div>
    )
}