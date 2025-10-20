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

    const formatAiInsight = (rawText) => {
        if (!rawText) return "";

        const paragraphs = rawText.split("\\n").map(p => p.trim()).filter(Boolean);

        return paragraphs.map((p, index) => {
            // Deteksi jika diawali dengan nomor atau tanda bintang (misalnya "3." atau "*")
            const match = p.match(/^(\d+\.|\*)\s+(.*)/);
            let content = match ? match[2] : p;

            // Ganti semua **teks** dengan <strong>teks</strong>
            const parts = [];
            const regex = /\*\*(.*?)\*\*/g;
            let lastIndex = 0;
            let boldMatch;

            while ((boldMatch = regex.exec(content)) !== null) {
                // Teks sebelum **
                if (boldMatch.index > lastIndex) {
                    parts.push(content.slice(lastIndex, boldMatch.index));
                }
                // Teks di dalam **
                parts.push(<strong key={parts.length}>{boldMatch[1]}</strong>);
                lastIndex = regex.lastIndex;
            }

            // Tambahkan sisa teks setelah match terakhir
            if (lastIndex < content.length) {
                parts.push(content.slice(lastIndex));
            }

            return (
                <p key={index} className="mb-2">
                    {match && <strong>{match[1]}</strong>} {parts}
                </p>
            );
        });
    };


    const formatDescription = (rawText) => {
        if (!rawText) return "";

        const paragraphs = rawText.split(/\r?\n/).map(p => p.trim()).filter(Boolean);

        return paragraphs.map((p, index) => {
            const match = p.match(/^(\d+\.|\*)\s+(.*)/);
            if (match) {
                const symbol = match[1];
                const content = match[2];
                return (
                    <p key={index} className="mb-2">
                        <strong>{symbol}</strong> {content}
                    </p>
                );
            }
            return <p key={index} className="mb-2">{p}</p>;
        });
    }

    const formatCompleted = (value) => {
        return value === true || value === "true" ? "Yes" : "No";
    };

    return (
        <div className="w-full flex flex-col items-center py-8 px-4 sm:px-6">
            <div className="w-full max-w-2xl flex items-center justify-center gap-3 mb-4 sm:mb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                    Detail Todo {todoDetail.title}
                </h1>
            </div>
            <div className="w-full max-w-2xl p-4 sm:p-6 rounded-2xl shadow-[0_8px_30px_-8px_rgba(2,6,23,0.6)] border border-white/10 bg-white/10 backdrop-blur-md">
                <div className="flex flex-col gap-4 mb-4 sm:mb-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200">Title:</h2>
                        <span className="text-base sm:text-lg font-normal text-slate-300">{todoDetail.title}</span>
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200">Category:</h2>
                        <span className="text-base sm:text-lg font-normal text-slate-300">{todoDetail.category}</span>
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200">Priority:</h2>
                        <span className="text-base sm:text-lg font-normal text-slate-300">{todoDetail.priority}</span>
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200">Deadline:</h2>
                        <span className="text-base sm:text-lg font-normal text-slate-300">{formatDate(todoDetail.deadline)}</span>
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200">Is Completed:</h2>
                        <span className="text-base sm:text-lg font-normal text-slate-300">{formatCompleted(todoDetail.is_completed)}</span>
                    </div>
                    <div className="mt-2">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2">Description:</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 text-slate-300 text-start sm:text-justify max-h-40 sm:max-h-48 overflow-y-auto custom-scrollbar">
                            {formatDescription(todoDetail.description)}
                        </div>
                    </div>
                    <div className="mt-2 w-full">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200 mb-2">Insight From AI (Artificial Intelligence):</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 sm:p-4 text-slate-300 text-start sm:text-justify">
                            {formatAiInsight(todoDetail.ai_insight)}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-6 sm:mt-7 gap-4">
                    <Link href={`/todo/${slug}/home`}>
                        <button className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-md px-4 py-3 border border-white/10 hover:bg-white/3 transition text-slate-200">Back</button>
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