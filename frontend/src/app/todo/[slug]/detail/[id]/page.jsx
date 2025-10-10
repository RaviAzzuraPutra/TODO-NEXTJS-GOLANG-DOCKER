"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function TodoDetailPage() {
    const params = useParams
    const slug = params.slug
    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center py-10 px-2">
            <div className="w-full max-w-2xl flex items-center justify-center gap-3 mb-6">
                <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                    Detail Todo
                </h1>
            </div>
            <div className="w-full max-w-2xl p-6 rounded-2xl shadow-[0_8px_30px_-8px_rgba(2,6,23,0.6)] border border-white/10 bg-white/10 backdrop-blur-md">
                <div className="flex flex-col gap-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <h2 className="text-xl font-semibold text-slate-200">Title:</h2>
                        <span className="text-lg font-normal text-slate-300">Learn React</span>
                        <h2 className="text-xl font-semibold text-slate-200">Category:</h2>
                        <span className="text-lg font-normal text-slate-300">Study</span>
                        <h2 className="text-xl font-semibold text-slate-200">Priority:</h2>
                        <span className="text-lg font-normal text-slate-300">High</span>
                        <h2 className="text-xl font-semibold text-slate-200">Deadline:</h2>
                        <span className="text-lg font-normal text-slate-300">2023-12-31</span>
                        <h2 className="text-xl font-semibold text-slate-200">Is Completed:</h2>
                        <span className="text-lg font-normal text-slate-300">No</span>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-slate-200 mb-2">Description:</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-slate-300 text-justify max-h-48 overflow-y-auto custom-scrollbar">
                            A comprehensive guide to learning React.js. This section can contain very detailed and long text, such as step-by-step instructions, explanations, code samples, and best practices for mastering React. You can expand this area to fit all the information you need, and it will remain readable and visually appealing.
                        </div>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-slate-200 mb-2">Insight:</h2>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-slate-300 text-justify max-h-48 overflow-y-auto custom-scrollbar">
                            You can learn React by building small projects, watching tutorials on YouTube, reading documentation, and joining developer communities. Insights here can be very detailed, including personal experiences, tips, and strategies for effective learning. This area is designed to handle long and rich content gracefully.
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end mt-8">
                    <h4 className="text-md font-semibold text-slate-400">Created At: <span className="font-normal text-slate-300">2023-12-01</span></h4>
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