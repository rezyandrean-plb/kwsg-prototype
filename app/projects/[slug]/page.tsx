import { ProjectPageClient } from "./project-page-client"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params
  return <ProjectPageClient slug={resolvedParams.slug} />
}
