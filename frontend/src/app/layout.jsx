import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: 'ToDo List App With Artificial Intelligence',
  description: 'Dibuat menggunakan next.js',
  icons: {
    icon: "/assets/LOGO-copy.ico"
  }
}
const PUBLIC_ENVS = Object.keys(process.env || {})
  .filter((k) => k.startsWith("NEXT_PUBLIC_"))
  .reduce((acc, k) => {
    acc[k] = process.env[k];
    return acc;
  }, {});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-screen">
      <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
        <link rel="manifest" href="/manifest.json" />
        <Script id="env-inline" strategy="beforeInteractive">
          {`window.__ENV = ${JSON.stringify(PUBLIC_ENVS)};`}
        </Script>
      </head>
      <body>
        {children}
        <script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      </body>
    </html >
  )
}
