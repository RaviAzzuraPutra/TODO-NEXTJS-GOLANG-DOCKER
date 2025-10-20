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
    <html lang="en" className="min-h-screen">
      <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {children}
        <script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      </body>
    </html >
  )
}
