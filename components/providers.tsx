"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"
import { Provider } from "react-redux"
import { store } from "@/stores"
import { type Session } from "next-auth"

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  )
}
