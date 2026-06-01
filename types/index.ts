export type WorkflowStatus =
  | "active"
  | "inactive"
  | "completed"
  | "failed"
  | "draft"

export interface Workflow {
  id: number
  name: string
  status: WorkflowStatus
  updatedAt: Date
  trigger: string
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface BaseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  width: number
  height: number
  background?: string
}
