import { Workflow } from "@/types"

export const WORKFLOWS: Workflow[] = [
  {
    id: 1,
    name: "Welcome Email Automation",
    status: "active",
    updatedAt: new Date("2026-06-01T12:00:00Z"),
    trigger: "User Signup",
  },
  {
    id: 2,
    name: "Abandoned Cart Reminder",
    status: "inactive",
    updatedAt: new Date("2026-06-01T15:30:00Z"),
    trigger: "Cart Abandonment",
  },
  {
    id: 3,
    name: "Weekly Newsletter",
    status: "active",
    updatedAt: new Date("2026-06-03T09:00:00Z"),
    trigger: "Scheduled",
  },
]
