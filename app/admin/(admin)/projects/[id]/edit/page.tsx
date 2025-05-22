import { EditProjectForm } from "./edit-project-form"

interface PageProps {
  params: {
    id: string
  }
}

export default function EditProjectPage({ params }: PageProps) {
  return <EditProjectForm id={params.id} />
} 