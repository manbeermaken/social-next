import EditForm from "@/components/EditForm";
import { getPost } from "@/lib/actions/posts"

export default async function Edit({params}:{
    params: Promise<{postId:string}>
}) {
    const postId = (await params).postId
    const post = await getPost(postId)

    if(post && typeof post === "object" && "error" in post){
        return <p>post not found</p>
    }

    return (
        <div className="">
            <div className="mt-[10vh] mx-auto p-5 max-w-3xl text-xl flex flex-col gap-10 rounded-md">
                <h1 className="font-bold text-2xl">Edit post</h1>
                <EditForm post={post}/>
            </div>
        </div>
    )
}