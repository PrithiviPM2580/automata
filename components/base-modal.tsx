import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
      <DialogContent
        style={{
          maxWidth: width + "px",
          background: background,
        }}
        className="overflow-hidden p-0"
      >
        <div className="flex max-h-[85vh] flex-col">
          {(title || description) && (
            <DialogHeader className="border-b px-6 py-5">
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}

          <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

          {footer && <DialogFooter>{footer}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  )
}
