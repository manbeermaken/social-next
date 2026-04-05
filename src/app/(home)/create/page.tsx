import CreateForm from "@/components/CreateForm";

export default function Create() {
    return (
        <div className="">
            <div className="mt-[10vh] mx-auto p-5 max-w-3xl text-xl flex flex-col gap-10 rounded-md">
                <h1 className="font-bold text-2xl">Create post</h1>
                <CreateForm />
            </div>
        </div>
    )
}