"use client"
import Link from "next/link"
import Image from "next/image"

export default function Table() {
    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl">
                <thead className="text-sm uppercase text-center">
                    <tr className="bg-gradient-to-r from-indigo-600/10 via-sky-500/8 to-purple-600/10 text-slate-200">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4 text-left">Todo</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4">Priority</th>
                        <th className="py-3 px-4">Deadline</th>
                        <th className="py-3 px-4">Is Completed</th>
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-sm text-slate-200 hover:bg-white/2">
                    <tr className="odd:bg-white/3 even:bg-transparent">
                        <td className="py-3 px-4 text-center">1</td>
                        <td className="py-3 px-4 text-start">Learn React</td>
                        <td className="py-3 px-4 text-center">Study</td>
                        <td className="py-3 px-4 text-center">High</td>
                        <td className="py-3 px-4 text-center">2023-12-31</td>
                        <td className="py-3 px-4 text-center">No</td>
                        <td className="py-2 px-4 text-center">
                            <div className="flex items-center justify-center gap-3">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="todo" id="todo-1" className="accent-sky-200" />
                                    <label htmlFor="todo-1" className="text-sm">Done</label>
                                </div>

                                <Link href={`/todo/detail`}>
                                    <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10 hover:from-indigo-500/15 hover:to-purple-500/15 transition-shadow shadow-inner">
                                        <Image src="/assets/detail.png" alt="Detail" width={21} height={21} />
                                        <span className="text-sm">Detail</span>
                                    </button>
                                </Link>

                                <Link href={`/todo/update`}>
                                    <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10 hover:from-indigo-500/15 hover:to-purple-500/15 transition-shadow shadow-inner">
                                        <Image src="/assets/update.png" alt="Update" width={21} height={21} />
                                        <span className="text-sm">Update</span>
                                    </button>
                                </Link>

                                <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 bg-red-600/10 hover:bg-red-600/20 transition-colors">
                                    <Image src="/assets/delete.png" alt="Delete" width={21} height={21} />
                                    <span className="text-sm">Delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}