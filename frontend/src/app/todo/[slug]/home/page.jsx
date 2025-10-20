"use client"
import Table from "@/components/Table"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Alert, Snackbar } from "@mui/material"

export default function Home() {
    const params = useParams()
    const slug = params.slug

    const router = useRouter()
    const [alertOpen, setAlertOpen] = useState(false)
    const [alertPayload, setAlertPayload] = useState({ severity: "info", message: "" })

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

    useEffect(() => {
        try {
            const raw = localStorage.getItem("todo_alert")
            if (raw) {
                const parsed = JSON.parse(raw)
                setAlertPayload({ severity: parsed.severity || "success", message: parsed.message || "" })
                setAlertOpen(true)
                localStorage.removeItem("todo_alert")
            }
        } catch (e) {
            // ignore parsing error
        }
    }, [])


    return (
        <>
            <main className="px-4 sm:px-8 py-8 sm:py-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-6 sm:mb-10 pb-1 bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">ToDo List App With Artificial Intelligence</h1>
                <div className="overflow-x-auto">
                    <div className="mb-6 sm:mb-7 w-full flex justify-start">
                        <Link href={`/todo/${slug}/add`}>
                            <button className="inline-flex w-full sm:w-auto items-center gap-3 rounded-md px-5 sm:px-6 py-3 sm:py-3 min-h-[48px] bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10 hover:from-indigo-500/15 hover:to-purple-500/15 transition-shadow shadow-inner">
                                <Image src="/assets/add-task.png" alt="Add" width={20} height={20} />
                                <span className="text-base sm:text-md text-slate-200">Add New Todo List</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <Table />
            </main>
            <Snackbar
                open={alertOpen}
                autoHideDuration={4000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert severity={alertPayload.severity} onClose={() => setAlertOpen(false)} sx={{ width: "100%" }}>
                    {alertPayload.message}
                </Alert>
            </Snackbar>
        </>
    )
}