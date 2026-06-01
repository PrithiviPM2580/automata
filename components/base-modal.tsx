import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BaseModalProps } from "@/types"

export default function BaseModal({
  children,
  open,
  onOpenChange,
  title,
  description,
  footer,
  width,
  height,
  background,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        style={{
          width: "500vw",
          maxWidth: width + "px",
          height: height + "px",
          background: background,
        }}
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-gray-500">{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="overflow-auto overflow-y-auto py-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}
