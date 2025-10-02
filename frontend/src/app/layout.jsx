import "./globals.css";


export const metadata = {
  title: 'ToDo List App With Artificial Intelligence',
  description: 'Dibuat menggunakan next.js',
  icons: {
    icon: "/assets/LOGO-copy.ico"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
      </head>
      <body className="relative flex items-center justify-center min-h-screen w-full p-5 bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {children}
      </body>
    </html >
  )
}
