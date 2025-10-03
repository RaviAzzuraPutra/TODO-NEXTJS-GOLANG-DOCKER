import Footer from "@/components/Footer";
import "../globals.css";
import Navbar from "@/components/Navbar";


export const metadata = {
    title: 'ToDo List App With Artificial Intelligence',
    description: 'Dibuat menggunakan next.js',
    icons: {
        icon: "/assets/LOGO-copy.ico"
    }
}

export default function TodoLayout({ children }) {
    return (
        <div className="w-full flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Sticky Navbar */}
            <header className="w-full top-0 left-0 z-50 sticky bg-transparent/40 backdrop-blur-xl">
                <div className="w-full mt-3">
                    <Navbar />
                </div>
            </header>
            <main className="flex-1 w-full flex flex-col items-center justify-start px-4 md:px-8 py-4">
                <div className="w-full max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
