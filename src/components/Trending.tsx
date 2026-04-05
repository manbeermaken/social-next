import Link from "next/link";

export default function Trending() {
    return (
        <div className="relative">
            <div className="sticky top-30 text-gray-300 max-w-3xs p-3">
                <h1 className="text-xl font-bold">Trending Posts</h1>
                <div className="flex flex-col gap-5 mt-3">
                    <ul>
                        {[...Array(5)].map((_, i) => (
                            <li key={i}>
                                <p key={`/p/${i + 1}`}>Trending Title {i + 1}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}