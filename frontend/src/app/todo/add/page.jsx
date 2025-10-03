"use client";
import Link from "next/link";

export default function AddTodoPage() {
    return (
        <div className="w-full flex justify-center flex-col items-center">
            <div className="w-full flex items-center justify-center gap-3 mb-4">
                <h1 className="text-4xl font-semibold text-center m-5 bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
                    Add New Todo
                </h1>
            </div>
            <div className="w-full p-4 rounded-xl shadow-[0_8px_30px_-8px_rgba(2,6,23,0.6)] border border-white/10 bg-white/5 backdrop-blur-sm">
                <form action="">
                    <div className="mb-2">
                        <label htmlFor="title" className="block text-md font-medium mb-2 text-slate-200">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="rounded-lg shadow-inner w-full px-5 py-2 border border-white/10 bg-transparent text-slate-200 placeholder:text-slate-400"
                            placeholder="Task title"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="description" className="block text-md font-medium mb-2 text-slate-200">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={8}
                            className="rounded-lg shadow-inner w-full px-5 py-3 border border-white/10 bg-transparent text-slate-200 placeholder:text-slate-400 resize-vertical"
                            placeholder="Write a complete description here... (explain what will be done, the purpose, context, etc.)"
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="deadline" className="block text-md font-medium mb-2 text-slate-200">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            className="rounded-lg shadow-inner w-full px-5 py-2 border border-white/10 bg-transparent text-slate-200"
                        />
                    </div>

                    <div className="flex justify-end mt-7 gap-4">
                        <button type="submit" className="inline-flex items-center gap-2 rounded-md px-5 py-2 border border-white/10 bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 hover:bg-white/10 transition text-slate-200 font-semibold shadow-md">
                            Add
                        </button>

                        <Link href="/todo/home">
                            <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-white/10 hover:bg-white/3 transition text-slate-200">Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}