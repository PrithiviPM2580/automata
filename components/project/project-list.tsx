import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { WORKFLOWS } from "@/lib/constants"
import { formatTimeAgo } from "@/lib/utils"
import { Edit3, Play, Trash } from "lucide-react"

export default function ProjectList() {
  return (
    <>
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
    </>
  )
}
