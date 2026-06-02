"use client"

import { AppDispatch, RootState } from "@/stores"
import { useDispatch, useSelector } from "react-redux"
import BaseModal from "../base-modal"
import { toggleModal } from "@/stores/project-slice"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectFormSchema, ProjectFormValues } from "@/validators/project"
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "../ui/field"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Loader2 } from "lucide-react"

export default function ProjectModal() {
  const dispatch = useDispatch<AppDispatch>()
  const { modal } = useSelector((state: RootState) => state.project)

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: ProjectFormValues) {
    console.log(data)
  }
  return (
    <BaseModal
      open={modal}
      onOpenChange={() => dispatch(toggleModal())}
      title="Create project"
      description="Give the project a clear name so it is easy to find later."
      width={520}
      height={320}
      footer={
        <div className="flex w-full flex-col-reverse gap-2 px-4 py-2 sm:flex-row sm:justify-end">
          <Button
            className="px-5 py-4"
            type="button"
            variant="outline"
            onClick={() => dispatch(toggleModal())}
          >
            Cancel
          </Button>
          <Button
            className="cursor-pointer! px-5 py-4"
            type="submit"
            form="form-rhf-demo"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Create project"
            )}
          </Button>
        </div>
      }
    >
      <form
        id="form-rhf-demo"
        className="space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel htmlFor="project-name">Project name</FieldLabel>
                <FieldDescription>
                  Use a short, descriptive name. This is what will appear in the
                  dashboard.
                </FieldDescription>
                <Input
                  {...field}
                  id="project-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Marketing site redesign"
                  autoComplete="off"
                  className="h-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </BaseModal>
  )
}
