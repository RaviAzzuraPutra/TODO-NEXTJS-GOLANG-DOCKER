"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import axios from "axios";
import { formatDate } from "../../../../../../utils/FormatDate";

export default function TodoDetailPage() {
    const params = useParams()
    const slug = params.slug
    const ID = params.id
    const [todoDetail, setTodoDetail] = useState({})

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


    useEffect(() => {
        fetchDataByID()
    }, [ID])

    const fetchDataByID = async () => {
        try {
            const detail = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/${ID}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                validateStatus: (status) => status < 500,
            })

            setTodoDetail(detail.data.Data)
        } catch (error) {
            console.error("Error Fetching Detail Todo Data:", error)
        }
    }

    function formatAiInsight(rawText) {
        if (!rawText) return "";

        // Pisahkan teks berdasarkan \n
        const paragraphs = rawText.split("\\n").map(p => p.trim()).filter(Boolean);

        return paragraphs.map((p, index) => {
            // Deteksi list (misal dimulai dengan angka + . atau *)
            const match = p.match(/^(\d+\.|\*)\s+(.*)/);
            if (match) {
                const symbol = match[1]; // angka. atau *
                const content = match[2]; // isi poin
                return (
                    <p key={index} className="mb-2">
                        <strong>{symbol}</strong> {content}
                    </p>
                );
            }
            // Paragraf biasa
            return <p key={index} className="mb-2">{p}</p>;
        });
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center py-10 px-2">
            <div className="w-full max-w-2xl flex items-center justify-center gap-3 mb-6">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                    Detail Todo {todoDetail.title}
                </h1>
            </div>
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-[0_8px_30px_-8px_rgba(2,6,23,0.6)] border border-white/10 bg-white/10 backdrop-blur-md">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <h2 className="text-xl font-semibold text-slate-200">Title:</h2>
                        <span className="text-lg font-normal text-slate-300">{todoDetail.title}</span>
                        <h2 className="text-xl font-semibold text-slate-200">Category:</h2>
                        <span className="text-lg font-normal text-slate-300">{todoDetail.category}</span>
                        <h2 className="text-xl font-semibold text-slate-200">Priority:</h2>
                        <span className="text-lg font-normal text-slate-300">{todoDetail.priority}</span>
                        <h2 className="text-xl font-semibold text-slate-200">Deadline:</h2>
                        <span className="text-lg font-normal text-slate-300">{formatDate(todoDetail.deadline)}</span>
                        <h2 className="text-xl font-semibold text-slate-200">Is Completed:</h2>
                        <span className="text-lg font-normal text-slate-300">{todoDetail.isCompleted ? "Yes" : "No"}</span>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-xl font-semibold text-slate-200 mb-2">Description:</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-slate-300 text-justify max-h-48 overflow-y-auto custom-scrollbar">
                            {todoDetail.description}
                        </div>
                    </div>
                    <div className="mt-2 w-full">
                        <h2 className="text-xl font-semibold text-slate-200 mb-2">Insight From AI (Artificial Intelligence):</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-slate-300 text-justify">
                            {formatAiInsight(todoDetail.ai_insight)}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end mt-8">
                    <h4 className="text-md font-semibold text-slate-400">Created At: <span className="font-normal text-slate-300">{formatDate(todoDetail.CreatedAt)}</span></h4>
                    <h4 className="text-md font-semibold text-slate-400">Updated At: <span className="font-normal text-slate-300">{formatDate(todoDetail.UpdatedAt)}</span></h4>
                </div>
                <div className="flex justify-end mt-7 gap-4">
                    <Link href={`/todo/${slug}/home`}>
                        <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-white/10 hover:bg-white/3 transition text-slate-200">Back</button>
                    </Link>
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99,102,241,0.3);
                    border-radius: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
            `}</style>
        </div>
    )
}