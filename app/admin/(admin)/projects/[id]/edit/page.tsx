import { EditProjectForm } from "./edit-project-form"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EditProjectPage({ params }: Props) {
  return <EditProjectForm id={params.id} />
} 