"use client"

import { Sun, Moon, LaptopMinimal } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function SelectTheme() {
  const { theme, setTheme } = useTheme()
  const value = theme ?? "system"

  const options = [
    { value: "light", icon: <Sun className="size-3" />, label: "Light" },
    { value: "dark", icon: <Moon className="size-3" />, label: "Dark" },
    {
      value: "system",
      icon: <LaptopMinimal className="size-3" />,
      label: "System",
    },
  ]

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full bg-muted p-0.5">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <Button
            key={opt.value}
            size="icon-sm"
            variant={active ? "default" : "ghost"}
            className={cn("rounded-full p-1", active ? "" : "opacity-80")}
            aria-pressed={active}
            onClick={() => setTheme(opt.value)}
          >
            <span className="sr-only">{opt.label}</span>
            {opt.icon}
          </Button>
        )
      })}
    </div>
  )
}
