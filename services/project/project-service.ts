import Project, { ProjectInput } from "@/models/project"
import { UpdateProjectData } from "@/types"

export class ProjectService {
  private static instance: ProjectService

  public static getInstance(): ProjectService {
    if (!ProjectService.instance) {
      ProjectService.instance = new ProjectService()
    }
    return ProjectService.instance
  }

  async createproject(projectData: ProjectInput) {
    const project = new Project({
      ...projectData,
    })

    const newProject = await project.save()

    return newProject.toObject()
  }

  async updateProjects(projectData: UpdateProjectData) {
    const { id, name, userId, status, trigger, updatedAt } = projectData

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, userId, status, trigger, updatedAt },
      { new: true, runValidators: true }
    )

    return updatedProject?.toObject()
  }

  async getSingleProject(projectId: string) {
    const project = await Project.findById(projectId)
    return project?.toObject()
  }

  async getAllProjects({
    search = "",
    page = 1,
    limit = 10,
  }: {
    search?: string
    page?: number
    limit?: number
  }) {
    const skip = (page - 1) * limit

    const filter: any = {}

    if (search) {
      filter.$or = [{ title: { $regex: search, $options: "i" } }]
    }

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      Project.countDocuments(filter),
    ])

    return {
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }
}
