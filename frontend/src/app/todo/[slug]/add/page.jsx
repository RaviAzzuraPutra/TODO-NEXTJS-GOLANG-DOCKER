"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";
import Lottie from "lottie-react";
import LoadingAnimations from "/public/assets/loading-animation.json"


export default function AddTodoPage() {
    const params = useParams()
    const slug = params.slug
    const [todoFields, setTodoFields] = useState({
        title: "",
        description: "",
        deadline: "",
    })

    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState({ open: false, severity: "info", message: "" })

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

    const changeTodoField = (e) => {
        setTodoFields({
            ...todoFields,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", todoFields.title);
        formData.append("description", todoFields.description);
        formData.append("deadline", todoFields.deadline);

        if (!todoFields.title) {
            setSnackbar({ open: true, severity: "warning", message: "The title is an imperative data entity that requires valid filling in order to ensure the integrity of the form." })
            return;
        }

        if (!todoFields.description) {
            setSnackbar({ open: true, severity: "warning", message: "The description is an imperative data entity that requires valid filling in order to ensure the integrity of the form." })
            return;
        }

        if (!todoFields.deadline) {
            setSnackbar({ open: true, severity: "warning", message: "The deadline is an imperative data entity that requires valid filling in order to ensure the integrity of the form." })
            return;
        }

        try {
            setLoading(true)

            const create = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/todo/create-todo`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
            })

            setLoading(false)
            if (create.status === 201) {
                localStorage.setItem("todo_alert", JSON.stringify({ severity: "success", message: "Todo created successfully!" }))
                router.replace(`/todo/${slug}/home`)
                return;
            }

            setSnackbar({ open: true, severity: "error", message: "Unexpected response from server." })
            return;

        } catch (error) {
            console.error("There was an error creating the todo:", error);
            setLoading(false)
            setSnackbar({ open: true, severity: "error", message: "There was an error creating the todo. Please try again later." })
            return;
        }

    }

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
                            value={todoFields.title}
                            onChange={changeTodoField}
                            className="rounded-lg shadow-inner w-full px-5 py-2 border border-white/10 bg-transparent text-slate-200 placeholder:text-slate-400"
                            placeholder="Task title"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="description" className="block text-md font-medium mb-2 text-slate-200">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            rows={8}
                            value={todoFields.description}
                            onChange={changeTodoField}
                            className="rounded-lg shadow-inner w-full px-5 py-3 border border-white/10 bg-transparent text-slate-200 placeholder:text-slate-400 resize-vertical"
                            placeholder="Write a complete description here... (explain what will be done, the purpose, context, etc.)"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="deadline" className="block text-md font-medium mb-2 text-slate-200">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            name="deadline"
                            value={todoFields.deadline}
                            onChange={changeTodoField}
                            className="rounded-lg shadow-inner w-full px-5 py-2 border border-white/10 bg-transparent text-slate-200"
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-end mt-7 gap-4">
                        <button type="submit" onClick={e => onSubmit(e)} disabled={loading} className="inline-flex items-center gap-2 rounded-md px-5 py-2 border border-white/10 bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 hover:bg-white/10 transition text-slate-200 font-semibold shadow-md">
                            Create
                        </button>

                        <Link href={`/todo/${slug}/home`}>
                            <button className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-white/10 hover:bg-white/3 transition text-slate-200">Back</button>
                        </Link>
                    </div>
                </form>
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
            {loading && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
                    <Lottie
                        animationData={LoadingAnimations}
                        loop={true}
                        className="w-52 h-52"
                    />
                    <p className="text-slate-200 text-lg font-semibold mt-4">
                        Creating your todo...
                    </p>
                </div>
            )}
        </div>
    )
}