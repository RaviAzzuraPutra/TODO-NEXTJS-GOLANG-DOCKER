export default function Login() {
    return (
        <main className="min-h-[calc(100dvh-4rem)] w-full flex items-center justify-center px-4 py-10">
            <div className="relative w-full max-w-xl">
                <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 via-sky-400 to-purple-500 rounded-3xl blur opacity-30 animate-pulse [animation-duration:6s]" aria-hidden="true" />

                <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/70 dark:bg-white/10 backdrop-blur-xl px-8 sm:px-10 md:px-14 py-12 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(56,189,248,0.18),transparent_60%)]" aria-hidden="true" />

                    <header className="relative flex flex-col items-center text-center">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-tr from-indigo-600 via-sky-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                            Login & Register
                        </h1>
                        <p className="mt-4 max-w-md text-sm sm:text-base text-slate-600 dark:text-slate-300">
                            Masuk dan daftar dengan akun Google Anda untuk mulai mengelola todo list secara mudah dan aman.
                        </p>
                    </header>

                    {/* Divider */}
                    <div className="relative my-10 flex items-center">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent" />
                        <span className="mx-4 text-[11px] tracking-wider uppercase font-semibold text-indigo-600/70 dark:text-indigo-300/80">
                            Akses Cepat
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
                    </div>

                    {/* Buttons */}
                    <div className="relative flex flex-col gap-5">
                        <button
                            type="button"
                            aria-label="Login dengan Google"
                            className="group relative flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-slate-800/80 px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-100 shadow-sm shadow-sky-900/5 ring-1 ring-slate-200/70 dark:ring-white/10 hover:ring-indigo-400/60 hover:shadow-[0_6px_22px_-4px_rgba(99,102,241,0.35)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-slate-900">
                            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/0 via-sky-400/0 to-purple-500/0 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500" />
                            <img
                                src="https://www.svgrepo.com/show/355037/google.svg"
                                alt="Google Logo"
                                className="w-5 h-5 drop-shadow-sm"
                                loading="lazy"
                            />
                            <span className="relative bg-clip-text text-transparent bg-gradient-to-tr from-indigo-600 via-sky-600 to-purple-600 group-hover:from-indigo-500 group-hover:via-sky-500 group-hover:to-purple-500">
                                Sign in with Google
                            </span>
                            <span className="pointer-events-none absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </div>

                    {/* Decorative corner gradients */}
                    <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-400/20 via-sky-300/10 to-purple-400/20 blur-2xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-gradient-to-tr from-purple-400/20 via-sky-300/10 to-indigo-400/20 blur-2xl" aria-hidden="true" />
                </div>
            </div>
        </main>
    );
}