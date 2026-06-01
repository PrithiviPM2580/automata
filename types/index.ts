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
