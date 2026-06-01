"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LogOut, Palette } from "lucide-react"
import SelectTheme from "./select-theme"

export default function DropdownUser({ isUser }: { isUser: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9 overflow-hidden rounded-full p-0"
        >
          {isUser ? (
            <Avatar className="size-9">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback />
            </Avatar>
          ) : (
            <span className="size-9 rounded-full border border-border" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="flex w-46 flex-col gap-0.5" align="end">
        <DropdownMenuGroup className="flex items-center justify-between">
          <div>
            {isUser ? (
              <Avatar className="size-7">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                />
                <AvatarFallback />
              </Avatar>
            ) : (
              <span className="size-7 rounded-full border border-border" />
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="text-sm leading-none font-medium">
              {isUser ? "John Doe" : "Guest"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {isUser ? "john.doe@example.com" : "guest@example.com"}
            </p>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuItem
            className="px-2 py-2"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Palette className="size-4" />
                <span className="text-sm">Theme</span>
              </div>
              <SelectTheme />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOut /> Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
