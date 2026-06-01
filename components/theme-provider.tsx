"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderProps = React.PropsWithChildren<{
  attribute?: "class" | "data-theme"
  defaultTheme?: Theme
  disableTransitionOnChange?: boolean
  enableSystem?: boolean
  storageKey?: string
}>

type ThemeContextValue = {
  theme: Theme | undefined
  resolvedTheme: "light" | "dark" | undefined
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)"

function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light"
  }

  return window.matchMedia(SYSTEM_THEME_QUERY).matches ? "dark" : "light"
}

function getInitialTheme(storageKey: string, defaultTheme: Theme) {
  if (typeof window === "undefined") {
    return defaultTheme
  }

  try {
    return (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme
  } catch {
    return defaultTheme
  }
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  disableTransitionOnChange = false,
  enableSystem = true,
  storageKey = "theme",
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)
  const [theme, setThemeState] = React.useState<Theme>(() =>
    getInitialTheme(storageKey, defaultTheme)
  )

  const resolvedTheme =
    theme === "system" ? (enableSystem ? getSystemTheme() : "light") : theme

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) {
      return
    }

    const resolved =
      theme === "system" ? (enableSystem ? getSystemTheme() : "light") : theme
    const root = document.documentElement
    const transitionStyle = disableTransitionOnChange
      ? document.createElement("style")
      : null

    if (transitionStyle) {
      transitionStyle.setAttribute("data-theme-transition", "true")
      transitionStyle.textContent =
        "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
      document.head.appendChild(transitionStyle)
    }

    if (attribute === "class") {
      root.classList.remove("light", "dark")
      root.classList.add(resolved)
    } else {
      root.setAttribute(attribute, resolved)
    }

    root.style.colorScheme = resolved

    try {
      localStorage.setItem(storageKey, theme)
    } catch {
      // Ignore storage failures.
    }

    if (!enableSystem || theme !== "system") {
      return
    }

    const mediaQuery = window.matchMedia(SYSTEM_THEME_QUERY)
    const handleChange = () => {
      root.style.colorScheme = mediaQuery.matches ? "dark" : "light"
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      if (transitionStyle) {
        window.getComputedStyle(document.body)
        setTimeout(() => {
          transitionStyle.remove()
        }, 1)
      }
    }
  }, [
    attribute,
    disableTransitionOnChange,
    enableSystem,
    mounted,
    storageKey,
    theme,
  ])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setThemeState((currentTheme) =>
        currentTheme === "dark" ? "light" : "dark"
      )
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const providerValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme: mounted ? theme : undefined,
      resolvedTheme: mounted ? resolvedTheme : undefined,
      setTheme: setThemeState,
    }),
    [mounted, resolvedTheme, theme]
  )

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = React.useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }

  return context
}

export { ThemeProvider, useTheme }
