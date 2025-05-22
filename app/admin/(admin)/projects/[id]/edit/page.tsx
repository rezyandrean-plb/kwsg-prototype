import { EditProjectForm } from "./edit-project-form"

export default function EditProjectPage({
  params,
}: {
  params: { id: string }
}) {
  return <EditProjectForm id={params.id} />
} 