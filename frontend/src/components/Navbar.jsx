"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";

const params = useParams()
const slug = params.slug

const navbarItems = [
    { name: "Home", href: `/todo/${slug}/home` },
    { name: "About", href: `/todo/${slug}/about` }
]

export default function Navbar() {
    const pathname = usePathname();
    const [showDropdown, setShowDropdown] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown if click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    function handleLogout() {
        alert("Logout clicked");
    }

    return (
        <nav className="relative">
            {/* Background gradient & subtle glass effect (layout tidak diubah, hanya styling ditambah) */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-80">
                <div className="w-full h-full bg-gradient-to-r from-indigo-600/30 via-sky-500/25 to-purple-600/30 blur-xl" />
            </div>
            <div className="mx-auto px-7 relative">
                <div className="flex items-center justify-between h-20 backdrop-blur-xl rounded-2xl border border-white/15 bg-white/10 shadow-[0_4px_18px_-4px_rgba(0,0,0,0.25)] ring-1 ring-black/5 px-4 md:px-6">
                    {/* Kiri: Logo dan Nav */}
                    <div className="flex items-center gap-8">
                        <div className="flex-shrink-0 relative">
                            <span className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-indigo-500/20 via-sky-400/15 to-purple-500/20 blur-md" aria-hidden="true" />
                            <Image
                                className="h-10 w-10 relative drop-shadow-md"
                                src="/assets/LOGO.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                priority
                            />
                        </div>
                        <div>
                            <div className="flex gap-1">
                                {navbarItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className="group relative px-6 py-6 text-sm font-medium tracking-wide"
                                        >
                                            <span
                                                className={
                                                    "relative transition-colors duration-300 " +
                                                    (isActive
                                                        ? "bg-gradient-to-tr from-indigo-300 via-sky-200 to-purple-300 bg-clip-text text-transparent drop-shadow-sm"
                                                        : "text-slate-300/70 group-hover:text-white")
                                                }
                                            >
                                                {item.name}
                                            </span>
                                            {/* Active line */}
                                            <span
                                                className={
                                                    "absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-0 rounded-full bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-500 transition-all duration-500 ease-out " +
                                                    (isActive
                                                        ? "w-8 shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                                                        : "group-hover:w-8")
                                                }
                                            />
                                            {/* Hover glow */}
                                            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-indigo-500/10 via-sky-400/10 to-purple-500/10 rounded-xl" />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Kanan: Profile + Dropdown */}
                    <div className="flex items-center gap-4" ref={profileRef}>
                        <button
                            type="button"
                            className="focus:outline-none"
                            onClick={() => setShowDropdown((v) => !v)}
                            aria-label="Profile menu"
                        >
                            <Image
                                className="h-10 w-10 rounded-2xl ring-2 ring-white/20 object-cover shadow-md"
                                src="/assets/no-photo-profile.jpg"
                                width={40}
                                height={40}
                                alt="Profile"
                                loading="lazy"
                            />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-7 top-16 z-50 min-w-[120px] bg-white/90 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg flex flex-col items-start animate-fade-in">
                                <button
                                    className="flex items-center justify-center w-full rounded-lg transition-colors"
                                    onClick={handleLogout}
                                >
                                    <img src="/assets/logout.png" alt="logout" width={31} height={31} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}