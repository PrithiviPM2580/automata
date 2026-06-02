import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDistanceToNowStrict } from "date-fns"
import { toast } from "sonner"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date) {
  const value = formatDistanceToNowStrict(date)

  const [amount, unit] = value.split(" ")

  const units: Record<string, string> = {
    second: "s",
    seconds: "s",
    minute: "m",
    minutes: "m",
    hour: "h",
    hours: "h",
    day: "d",
    days: "d",
    month: "mo",
    months: "mo",
    year: "y",
    years: "y",
  }

  return `${amount}${units[unit]} ago`
}

export const showSuccessToast = (message?: string) => {
  toast.success(message, {
    position: "top-right",
    duration: 3000,
  })
}
