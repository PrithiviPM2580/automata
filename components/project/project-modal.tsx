"use client"

import { AppDispatch, RootState } from "@/stores"
import { useDispatch, useSelector } from "react-redux"
import BaseModal from "../base-modal"
import { toggleModal } from "@/stores/project-slice"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectFormSchema, ProjectFormValues } from "@/validators/project"
import { FieldGroup, Field, FieldLabel, FieldError } from "../ui/field"
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

  function onSubmit(data: ProjectFormValues) {}

  const footer = () => {
    return <div></div>
  }
  return (
    <div>
      <BaseModal
        open={modal}
        onOpenChange={() => dispatch(toggleModal())}
        title="Create Project"
        description=""
        width={500}
        height={280}
        footer={footer()}
      >
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Bug Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="flex justify-between">
            <div></div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => dispatch(toggleModal())}>
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                type="submit"
                form="form-rhf-demo"
                disabled={!form.formState.isValid}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        </form>
      </BaseModal>
    </div>
  )
}
