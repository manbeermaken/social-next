"use client"

import { fetchPosts } from "@/lib/actions/posts"
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import PostMenu from "./PostMenu";
import { AppContext } from "./Providers"
import PostDate from "./PostDate";
import { type Post as PostType } from "@/lib/actions/posts";
import Post from "./Post";

interface PostListProps {
    initialPosts: PostType[];
    initialCursor: string | null;
}

export default function MainFeed({ initialPosts, initialCursor }: PostListProps) {
    const [posts, setPosts] = useState<PostType[]>(initialPosts);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const { username, setUsername } = useContext(AppContext)

    const { ref, inView, entry } = useInView();

    useEffect(() => {
        if (inView && cursor && !isLoading) {
            loadMorePosts();
        }
    }, [inView, cursor, isLoading])

    const loadMorePosts = async () => {
        setIsLoading(true)

        const data = await fetchPosts(cursor)

        if (data && !data.error) {
            setPosts(prevPosts => [...prevPosts, ...data.posts])
            setCursor(data.nextCursor)
            setError(false)
        } else {
            setError(true)
        }
        setIsLoading(false)
    }

    return (
        <div className="flex flex-col gap-20 mt-[10vh] w-[80%] mx-auto">
            {posts.map((post) => (
                <Post post={post} key={post._id}/>
            ))}

            {cursor && (
                <div ref={ref}>
                    {isLoading ? <Loader className="animate-spin mx-auto" /> : "Scroll for more"}
                </div>
            )}

            {!cursor && posts.length > 0 && (
                <div>You have reached the end!</div>
            )}
        </div>
    )
}