import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bao UI - Next.js Demo',
  description: 'Demo showcasing Bao UI components with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
