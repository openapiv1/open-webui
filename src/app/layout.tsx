import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Open WebUI',
  description: 'Open WebUI - A user-friendly web interface for chat completion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="dark:bg-gray-900 bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}