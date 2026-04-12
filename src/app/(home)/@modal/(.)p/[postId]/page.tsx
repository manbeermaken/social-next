import ModalPost from "@/components/ModalPost"
import { getPost, type ActionState } from "@/lib/actions/posts"

export default async function SinglePost({ params }: {
    params: Promise<{ postId: string }>
}) {
    const postId = (await params).postId
    const post = await getPost(postId)
    if(post && typeof post === "object" && "error" in post){
        return <p>post not found</p>
    }

    return (
        <ModalPost post={post}></ModalPost>
    )
}