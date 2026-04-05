import { fetchPosts } from "@/lib/actions/posts";
import MainFeed from "@/components/MainFeed";

export default async function Main() {
    const initialData = await fetchPosts(null)
    if (initialData?.error) {
        return <div>Error loading posts. Please try again.</div>;
    }
    return (
        <main className="">
            <MainFeed initialPosts={initialData.posts} initialCursor={initialData.nextCursor} />
        </main>
    )
}