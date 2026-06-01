import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
import type { Session } from "next-auth"
import { Providers } from "@/components/providers"
import { getSession } from "@/lib/auth"

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session: Session | null = await getSession()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}
