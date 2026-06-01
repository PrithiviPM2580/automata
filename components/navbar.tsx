import Link from "next/link"

import Logo from "./logo"
import { cn } from "@/lib/utils"
import DropdownUser from "./dropdown-user"

export default function Navbar({ className }: { className?: string }) {
  const isUser = true

  return (
    <header className={cn("w-full border-b bg-card/50", className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-primary">
            <Logo className="size-9" />
          </span>
          <span className="text-xl font-semibold">Automata</span>
        </Link>

        <div className="flex items-center gap-4">
          <DropdownUser isUser={isUser} />
        </div>
      </div>
    </header>
  )
}
