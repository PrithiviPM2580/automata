import { withErrorHandler } from "@/lib/with-error-handler"
import { ProjectInput } from "@/models/project"
import { ProjectService } from "@/services/project/project-service"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = (await req.json()) as ProjectInput

  return withErrorHandler(async () => {
    const projectService = ProjectService.getInstance()
    const project = await projectService.createproject({ ...body })

    return NextResponse.json(project)
  })
}
