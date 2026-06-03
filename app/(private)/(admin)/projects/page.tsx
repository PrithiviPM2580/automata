"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import Navbar from "@/components/navbar"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/stores"
import { useSession } from "next-auth/react"
import ProjectModal from "@/components/project/project-modal"
import { toggleModal } from "@/stores/project-slice"
import ProjectList from "@/components/project/project-list"

export default function Projects() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()
  return (
    <div className="min-h-full">
      <Navbar />
      <ProjectModal />
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
              onClick={() => dispatch(toggleModal())}
            >
              <Plus />
              New Workflow
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          <ProjectList />
        </div>
      </section>
    </div>
  )
}
