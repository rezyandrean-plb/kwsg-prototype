import { EditProjectForm } from "./edit-project-form"

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  return <EditProjectForm id={resolvedParams.id} />
} 