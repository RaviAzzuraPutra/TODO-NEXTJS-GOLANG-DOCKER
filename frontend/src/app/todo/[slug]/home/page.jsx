"use client"
import Table from "@/components/Table"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
    const params = useParams()
    const slug = params.slug

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const savedSlug = localStorage.getItem("slug");

        if (!token || slug !== savedSlug) {
            router.replace("/login")
            return
        }

        const handlePopState = () => {
            router.replace(`/todo/${slug}/home`);
        }

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        }
    }, [router, slug])



    return (
        <>
            <main className="px-8 py-10">
                <h1 className="text-3xl font-semibold tracking-tight mt-8 mb-10 bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">ToDo List App With Artificial Intelligence</h1>
                <div className="overflow-x-auto">
                    <div className="mb-7 w-full flex justify-start">
                        <Link href={`/todo/${slug}/add`}>
                            <button className="inline-flex items-center gap-2 rounded-md px-5 py-3 bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10 hover:from-indigo-500/15 hover:to-purple-500/15 transition-shadow shadow-inner">
                                <Image src="/assets/add-task.png" alt="Add" width={21} height={21} />
                                <span className="text-md text-slate-200">Add New Todo List</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <Table />
            </main>
        </>
    )
}