import { fetchUserPosts } from "@/lib/actions/posts";
import UserFeed from "@/components/UserFeed";
import { getCurrentUsername } from "@/lib/decode";
import { CircleUserRound, Settings } from "lucide-react";
import Link from "next/link";

export default async function User({ params }: {
    params: Promise<{ username: string }>
}) {
    const currentUsername = await getCurrentUsername()
    const username = (await params).username

    const initialData = await fetchUserPosts(null, username)
    if (initialData?.error) {
        return <div className="text-center mt-[10vh] text-xl font-semibold">{initialData?.error}</div>;
    }
    return (
        <main className="">
            {/* {username == currentUsername
                ? <div className="mx-auto w-[80%]">
                    <div className="flex items-center gap-5">
                        <CircleUserRound size={64} />
                        <h1>{username}</h1>
                        <Link href={'/a/edit'} >
                            <Settings />
                        </Link>
                    </div>
                </div>
                : <div className="mx-auto w-[80%]">
                    <div className="flex items-center gap-5">
                        <CircleUserRound size={64} />
                        <h1>{username}</h1>
                    </div>
                </div>}
            <hr className="mt-5 w-[90%] mx-auto"/> */}
            {!initialData.posts.length ? <div className="text-center mt-[10vh] text-xl font-semibold">User has not posted anything.</div>
                : <UserFeed initialPosts={initialData.posts} initialCursor={initialData.nextCursor} username={username} />}
        </main>
    )
}