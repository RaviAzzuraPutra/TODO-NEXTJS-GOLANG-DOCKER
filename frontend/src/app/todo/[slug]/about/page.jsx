"use client"
import { Github, Linkedin, Mail, Zap, BrainCircuit, Smile } from "lucide-react"
import Link from "next/link"

export default function About() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            {/* Header Section */}
            <section className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white">About</h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                            Understand this application and how it works, designed to provide the best solution for you!!!
                        </p>
                    </div>
                </div>
            </section>

            {/* Creator Section */}
            <section className="py-16 sm:py-24 bg-white/70 dark:bg-slate-950 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Creator Info */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">About Me</h2>
                                <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                            </div>

                            <div className="space-y-4 text-justify">
                                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">RAVI AZZURA PUTRA</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    My name is Ravi Azzura Putra, and I focus on web development and software development, particularly as a back-end developer.
                                    As a beginner, I am quick to adapt, enjoy learning new technologies, and am determined to improve my skills to become a competent professional in web development.
                                </p>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    I believe that technology should be easy to use, accessible to everyone, and provide real value in everyday life.
                                </p>
                            </div>

                            {/* Social Links - Manual Buttons */}
                            <div className="flex gap-4 pt-4">
                                <Link href={"https://github.com/RaviAzzuraPutra"}>
                                    <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                                        <Github className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    </button>
                                </Link>
                                <Link href={"https://www.linkedin.com/in/ravi-azzura-putra-92059227b/"}>
                                    <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                                        <Linkedin className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    </button>
                                </Link>
                                <Link href={"mailto:ravi.azzura74@gmail.com"}>
                                    <button className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center transition-colors">
                                        <Mail className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Creator Avatar Card - Manual Card */}
                        <div className="flex justify-center">
                            <div className="p-8 w-full max-w-sm bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800 rounded-lg shadow-md backdrop-blur-sm">
                                <div className="space-y-4 text-center">
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                                        <span className="text-4xl">👨‍💻</span>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white">RAVI AZZURA PUTRA</h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Passionate Developers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Application Info Section */}
            <section className="py-16 sm:py-24 bg-slate-50/95 dark:bg-slate-900 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">About Application</h2>
                            <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Feature 1 - Manual Card */}
                            <div className="p-6 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-lg hover:shadow-lg transition-shadow">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                        <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">High Performance</h3>
                                    <p className="text-slate-600 text-justify dark:text-slate-400">
                                        The system has been optimized for  operational efficiency, this delivering a responsive and fluid user experience.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 - Manual Card */}
                            <div className="p-6 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-lg hover:shadow-lg transition-shadow">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                                        <BrainCircuit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">There is Artificial Intelligence</h3>
                                    <p className="text-slate-600 text-justify dark:text-slate-400">
                                        It incorporates artificial-intelligence capabilities leveraging the Google Gemini model to autonomously suggest categorizations and priority assignments for outstanding to-do items.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 - Manual Card */}
                            <div className="p-6 bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-lg hover:shadow-lg transition-shadow">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                        <Smile className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Simple</h3>
                                    <p className="text-slate-600 text-justify dark:text-slate-400">
                                        This application constitutes a streamlined instrument designed to facilitate personal task management, featuring an intuitive interface engineered for accessibility across diverse user segments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-24 bg-white/70 dark:bg-slate-950 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">How the Application Works</h2>
                            <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                        </div>

                        {/* Steps */}
                        <div className="space-y-8">
                            {/* Step 1 - Sign in */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                    <div className="w-1 h-20 bg-blue-200 dark:bg-blue-800 mt-2"></div>
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Sign in with Google</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Use your Google account to sign in. We validate your Google ID token on the server and
                                        create a user record if this is your first time. After signing in you get a short-lived JWT
                                        stored as a secure session and a cookie so you stay logged in while using the app.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 - Sessions & Security */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                                        2
                                    </div>
                                    <div className="w-1 h-20 bg-indigo-200 dark:bg-indigo-800 mt-2"></div>
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Sessions & Authorization</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        After a successful login the server issues a JWT and saves a session record. The app uses
                                        that token (cookie or Bearer header) to access your personal to-dos. Routes that manage
                                        todos are protected — only you can read or change your own tasks.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 - Create & AI assistance */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                                        3
                                    </div>
                                    <div className="w-1 h-20 bg-purple-200 dark:bg-purple-800 mt-2"></div>
                                </div>
                                <div className="pb-8">
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Create a To‑Do — with AI help</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        When you add a new to-do, the backend sends the title, description and deadline to an
                                        AI helper (Gemini). The AI returns a suggested category (Work, Study, Personal, etc.), a
                                        priority (High / Medium / Low) and a short AI insight with actionable advice. You can use
                                        those suggestions as-is or edit them before saving.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 - Manage Todos */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-lg">
                                        4
                                    </div>
                                    <div className="w-1 h-20 bg-cyan-600 dark:bg-cyan-800 mt-2"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Edit, Complete, or Delete</h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        You can update any task, toggle its completion status, or delete it. If you change the
                                        title or description, the AI will re-evaluate category, priority and insight. Changing
                                        only the deadline will update priority without regenerating the full insight.
                                    </p>
                                </div>
                            </div>

                            {/* Extra Tips */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                                        ✓
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">A few helpful tips</h3>
                                    <ul className="list-inside list-decimal text-slate-600 dark:text-slate-400">
                                        <li>Use clear titles and a couple of short sentences in the description — AI suggestions get better with context.</li>
                                        <li>Set realistic deadlines. The AI looks at days-left to decide if a task is High/Medium/Low priority.</li>
                                        <li>Sign out when using a shared computer — sessions are stored on the server and a cookie keeps you logged in locally.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Stack Section */}
            <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Technology used</h2>
                            <div className="h-1 w-16 bg-blue-600 rounded-full"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { name: "JavaScript (Frontend) dan Golang (Backend)", desc: "Language" },
                                { name: "React", desc: "UI Library" },
                                { name: "Tailwind CSS", desc: "Styling" },
                                { name: "Next.js (Frontend) and Gin (Backend)", desc: "Framework" },
                                { name: "Postgresql", desc: "Database" },
                                { name: "Docker", desc: "Containerization" },
                                { name: "Git", desc: "Version Control" },
                                { name: "Gemini API", desc: "API" },
                            ].map((tech) => (
                                <div
                                    key={tech.name}
                                    className="p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-center hover:shadow-lg transition-shadow"
                                >
                                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{tech.name}</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{tech.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}