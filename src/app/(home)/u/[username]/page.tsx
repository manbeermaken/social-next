import { fetchUserPosts } from "@/lib/actions/posts";
import UserFeed from "@/components/UserFeed";

export default async function User({params}: {
    params : Promise< { username:string} >
}) {
    const username = (await params).username

    const initialData = await fetchUserPosts(null,username)
    if (initialData?.error) {
        return <div className="text-center">Error loading posts. Please try again.</div>;
    }
    if(initialData.posts.length == 0){
        return <div className="text-center">User has not posted anything</div>
    }
    return (
        <main className="">
            <UserFeed initialPosts={initialData.posts} initialCursor={initialData.nextCursor} username={username}/>
        </main>
    )
}