import { ProjectPageClient } from "./project-page-client"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolved = await params
  return <ProjectPageClient slug={resolved.slug} />
}
