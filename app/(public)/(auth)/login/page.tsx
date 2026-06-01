"use client"

import Link from "next/link"
import GoogleSvg from "@/components/google-sgv"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login() {
  const { data: session } = useSession()
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.08),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-4 py-10 text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-size-[32px_32px] opacity-50" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="border-border/60 bg-card/90 py-6 shadow-2xl shadow-slate-950/5 backdrop-blur">
          <CardHeader className="space-y-4 pb-4 text-center">
            <div className="space-y-2">
              <CardTitle className="text-2xl">Continue with Google</CardTitle>
              <CardDescription className="text-sm leading-6">
                Sign in to Automata with your Google account.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <Button
              asChild
              size="lg"
              className="h-12 w-full gap-3 rounded-full border-border/70 bg-background text-foreground hover:bg-muted"
              variant="outline"
              onClick={() => signIn()}
            >
              <Link href="/api/auth/signin/google">
                <span className="flex items-center justify-center [&>svg]:size-5">
                  <GoogleSvg />
                </span>
                Continue with Google
              </Link>
            </Button>
          </CardContent>

          <CardFooter className="border-t border-border/60 bg-muted/40 px-6 py-4">
            <p className="w-full text-center text-xs leading-5 text-muted-foreground">
              You will be redirected to Google to complete authentication.
            </p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
