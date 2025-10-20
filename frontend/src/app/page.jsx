import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 min-h-screen w-full flex items-center justify-center p-4">
      <div className="border border-white/40 bg-white/70 backdrop-blur-xl rounded-4xl py-8 px-4 sm:py-10 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/5 max-h-[90vh] overflow-auto">
        <div className="mb-6">
          <div className="p-[3px] rounded-full bg-gradient-to-tr from-indigo-500 via-sky-400 to-purple-500 shadow-lg">
            <div className="rounded-full bg-white w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/LOGO.png"
                alt="App Logo"
                width={128}
                height={128}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        <div className="text-center w-full">
          <h2 className="font-bold bg-gradient-to-r from-indigo-600 via-sky-600 to-purple-600 bg-clip-text text-transparent text-2xl md:text-3xl mt-2 mb-4 drop-shadow-sm">
            ToDo List App With Artificial Intelligence
          </h2>
          <Link href="/login" className="inline-block">
            <button className="group relative w-full sm:w-auto px-6 py-2.5 mt-2 md:mt-4 font-medium text-white bg-gradient-to-r from-indigo-500 via-sky-500 to-purple-500 shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30 transition-all duration-300 hover:from-indigo-600 hover:via-sky-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 active:scale-[0.98]">
              <span className="relative z-10">Login</span>
            </button>
          </Link>
          <p className="text-gray-500 text-xs md:text-sm mt-6 md:mt-8">
            © 2025 By <span className="font-semibold text-slate-700 dark:text-slate-200">Ravi Azzura Putra</span>. All rights reserved.
          </p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(circle_at_80%_40%,rgba(14,165,233,0.18),transparent_60%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.18),transparent_60%)]" />
    </div>
  );
}
