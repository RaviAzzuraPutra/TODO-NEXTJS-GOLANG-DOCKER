"use client"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { formatDate } from "../../utils/FormatDate"
import Swal from "sweetalert2"
import { Alert, Snackbar } from "@mui/material";

export default function Table() {
    const params = useParams()
    const slug = params.slug
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [snackbar, setSnackbar] = useState({ open: false, severity: "info", message: "" })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem("access_token")

            const get = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                validateStatus: (status) => status < 500,
            })

            if (get.status === 404) {
                setTodos([])
                setMessage(get.data.Message || "There is nothing to do at all!")
            } else if (get.data.Data && get.data.Data.length > 0) {
                setTodos(get.data.Data)
                setMessage("")
            } else {
                setTodos([])
                setMessage(get.data.message || "There is nothing to do at all!")
            }
        } catch (error) {
            console.error("Error Fetching Full Todo Data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (ID) => {
        Swal.fire({
            title: "Are you sure you want to delete this data?",
            text: "Deleted data cannot be recovered!",
            icon: "warning",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes, delete it!",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6366f1",
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            color: "#e2e8f0",
            iconColor: "#fbbf24",
            customClass: {
                popup: "backdrop-blur-sm shadow-2xl border border-white/10",
                title: "text-slate-200",
                htmlContainer: "text-slate-300",
                confirmButton: "px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all",
                cancelButton: "px-6 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/${ID}`, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                        validateStatus: (status) => status < 500,
                    })

                    const newData = todos.filter((items) => {
                        return items.id !== ID
                    })
                    setTodos(newData)

                    setSnackbar({ open: true, severity: "success", message: "Todo deleted successfully!" })
                } catch (error) {
                    console.error("Error Deleting Todo:", error)
                    setSnackbar({ open: true, severity: "error", message: "Failed to delete todo." })
                }
            }
        })
    }

    const formatCompleted = (value) => {
        return value === true || value === "true" ? "Yes" : "No";
    };

    const isCompletedCheck = async (todoID, currentStatus) => {
        try {
            const token = localStorage.getItem("access_token")

            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/update-status/${todoID}`, { is_completed: !currentStatus }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                validateStatus: (status) => status < 500,
            })

            if (response.status === 200) {
                await fetchData();
                setSnackbar({
                    open: true,
                    severity: "success",
                    message: "Todo Is Completed!"
                })
            } else {
                setSnackbar({
                    open: true,
                    severity: "error",
                    message: "Failed to update status."
                })
            }
        } catch (error) {
            console.error("Error Updating Todo Status:", error)
        }
    }

    return (
        <div className="w-full">
            {/* Desktop/Table for md+ */}
            <div className="hidden md:block overflow-x-auto">
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
                    <tbody className="text-sm text-slate-200">
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="py-6 text-center text-slate-400">
                                    Loading...
                                </td>
                            </tr>
                        ) : todos.length > 0 ? (
                            todos.map((todo, index) => (
                                <tr
                                    className={`${todo.is_completed
                                        ? "bg-gray-800/60 text-gray-500 hover:bg-gray-800/70"
                                        : "odd:bg-white/3 even:bg-transparent hover:bg-white/2"
                                        }`}
                                    key={todo.id}
                                >
                                    <td className="py-3 px-4 text-center">{index + 1}</td>
                                    <td className="py-3 px-4 text-start">{todo.title}</td>
                                    <td className="py-3 px-4 text-center">{todo.category}</td>
                                    <td className="py-3 px-4 text-center">{todo.priority}</td>
                                    <td className="py-3 px-4 text-center">{formatDate(todo.deadline)}</td>
                                    <td className="py-3 px-4 text-center">{formatCompleted(todo.is_completed)}</td>
                                    <td className="py-2 px-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    name="todo"
                                                    id={`todo-${todo.id}`}
                                                    checked={todo.is_completed}
                                                    onChange={() => isCompletedCheck(todo.id, todo.is_completed)}
                                                    className="accent-sky-200 cursor-pointer"
                                                />

                                                <label htmlFor={`todo-${todo.id}`} className="text-sm">Done</label>
                                            </div>

                                            <Link href={`/todo/${slug}/detail/${todo.id}`}>
                                                <button className="inline-flex items-center justify-center gap-1 rounded-md px-3 py-3 bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10 hover:from-indigo-500/15 hover:to-purple-500/15 transition-shadow shadow-inner">
                                                    <Image src="/assets/detail.png" alt="Detail" width={21} height={21} />
                                                    <span className="text-sm text-slate-200">Detail</span>
                                                </button>
                                            </Link>

                                            <Link href={todo.is_completed ? "#" : `/todo/${slug}/update/${todo.id}`}>
                                                <button
                                                    disabled={todo.is_completed}
                                                    className={`inline-flex items-center justify-center gap-1 rounded-md px-3 py-3 transition-shadow shadow-inner ${todo.is_completed
                                                        ? "bg-gray-700/30 cursor-not-allowed opacity-50"
                                                        : "bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10 hover:from-indigo-500/15 hover:to-purple-500/15"
                                                        }`}
                                                >
                                                    <Image src="/assets/update.png" alt="Update" width={21} height={21} />
                                                    <span className="text-sm text-slate-200">Update</span>
                                                </button>
                                            </Link>

                                            <button onClick={() => handleDelete(todo.id)} className="inline-flex items-center justify-center gap-1 rounded-md px-3 py-3 bg-red-600/10 hover:bg-red-600/20 transition-colors">
                                                <Image src="/assets/delete.png" alt="Delete" width={21} height={21} />
                                                <span className="text-sm text-slate-200">Delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-6 text-center text-slate-400">
                                    {message || "There is nothing to do at all!"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile card list for small screens */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="py-6 text-center text-slate-400">Loading...</div>
                ) : todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <div key={todo.id} className={`p-4 rounded-lg bg-white/5 backdrop-blur-sm shadow-md ${todo.is_completed ? 'opacity-60' : ''}`}>
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="text-md font-semibold text-slate-200">{todo.title}</h4>
                                    <p className="text-sm text-slate-400">{todo.category} • {todo.priority}</p>
                                    <p className="text-xs text-slate-400">{formatDate(todo.deadline)}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div>
                                        <input type="checkbox" checked={todo.is_completed} onChange={() => isCompletedCheck(todo.id, todo.is_completed)} className="accent-sky-200" />
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/todo/${slug}/detail/${todo.id}`}>
                                            <button className="inline-flex items-center justify-center gap-1 rounded-md px-4 py-3 min-w-[44px] min-h-[44px] bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10">
                                                <Image src="/assets/detail.png" alt="Detail" width={20} height={20} />
                                            </button>
                                        </Link>
                                        <Link href={todo.is_completed ? '#' : `/todo/${slug}/update/${todo.id}`}>
                                            <button disabled={todo.is_completed} className={`inline-flex items-center justify-center gap-1 rounded-md px-4 py-3 min-w-[44px] min-h-[44px] ${todo.is_completed ? 'bg-gray-700/30 cursor-not-allowed opacity-60' : 'bg-gradient-to-tr from-indigo-500/10 via-sky-400/6 to-purple-500/10'}`}>
                                                <Image src="/assets/update.png" alt="Update" width={20} height={20} />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(todo.id)} className="inline-flex items-center justify-center gap-1 rounded-md px-4 py-3 min-w-[44px] min-h-[44px] bg-red-600/10">
                                            <Image src="/assets/delete.png" alt="Delete" width={20} height={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-6 text-center text-slate-400">{message || "There is nothing to do at all!"}</div>
                )}
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    )
}