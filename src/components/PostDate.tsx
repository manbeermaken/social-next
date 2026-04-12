"use client"

function getRelativeTime(dateString: string) {
    const timestamp = new Date(dateString).getTime();
    const now = Date.now();
    
    let diff = (now - timestamp) / 1000;
    
    
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const year = day * 365.25;
    
    if (diff < minute) return `${Math.floor(diff)}s`;
    if (diff < hour) return `${Math.floor(diff / minute)}m`;
    if (diff < day) return `${Math.floor(diff / hour)}h`;
    if (diff < week) return `${Math.floor(diff / day)}d`;
    if (diff < year) return `${Math.floor(diff / week)}w`;
    return `${Math.floor(diff / year)}y`;
}

export default function PostDate({ createdAt, updatedAt }: { 
    createdAt: string;
    updatedAt: string;
}) {
    const postUpdated = createdAt == updatedAt
    return (
        <span className="font-light">
            {!postUpdated ? `${getRelativeTime(createdAt)} edited ${getRelativeTime(updatedAt)}` : getRelativeTime(createdAt)}
        </span>
    )
}