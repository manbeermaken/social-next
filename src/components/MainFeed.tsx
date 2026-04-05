"use client"

import { fetchPosts } from "@/lib/actions/posts"
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useInView } from "react-intersection-observer";
import PostMenu from "./PostMenu";
import { AppContext } from "./Providers"

type Post = {
    _id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: string;
    updatedAt: string;
}

interface PostListProps {
    initialPosts: Post[];
    initialCursor: string | null;
}

export default function MainFeed({ initialPosts, initialCursor }: PostListProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    const {username,setUsername} = useContext(AppContext)

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
        <div className="flex flex-col items-center gap-20 mt-[10vh]">
            {posts.map((post) => (
                <div key={post._id} className="p-5 border max-w-2xl rounded-md bg-gray-200 relative">
                    <PostMenu myPost={username == post.authorName} postId={post._id}/>
                    <Link href={`/p/${post._id}`} prefetch={false} className="text-xl font-bold">{post.title}</Link>
                    <div className="">
                        <p>{post.content}</p>
                    </div>
                    <div className="flex justify-between mt-3">
                        <Link href={`/u/${post.authorName}`} className="font-bold">{post.authorName}</Link>
                        <span>
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </div>
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