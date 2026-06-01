import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { WORKFLOWS } from "@/lib/constants"
import { formatTimeAgo } from "@/lib/utils"
import { Plus, Edit3, Play, Trash } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Projects() {
  return (
    <div className="min-h-full">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">My Workflows</h1>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <Input
              placeholder="Search workflows..."
              className="h-10 w-full sm:w-72"
            />
            <Button
              variant="default"
              size="sm"
              className="mt-2 flex h-10 items-center gap-2 sm:mt-0 sm:ml-3"
            >
              <Plus />
              New Workflow
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {WORKFLOWS.map((workflow) => (
            <Card key={workflow.id} className="flex h-full flex-col">
              <CardHeader className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <CardTitle className="truncate text-lg">
                    {workflow.name}
                  </CardTitle>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={workflow.status}>{workflow.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="mt- flex items-center justify-between">
                <p className="truncate text-sm font-medium text-foreground">
                  {workflow.trigger}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  {formatTimeAgo(workflow.updatedAt)}
                </div>
              </CardContent>

              <CardFooter className="mt-4 flex flex-wrap items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Play />
                  Run
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Edit3 />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Trash />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
