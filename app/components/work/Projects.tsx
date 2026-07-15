import ProjectCard from './ProjectCard'
import { getPublishedProjects } from '../../lib/content/public'

export default async function Projects() {
  const projects = await getPublishedProjects()
  return (
    <section>
      <section>
        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
    </section>
  )
}
