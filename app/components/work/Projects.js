import ProjectCard from './ProjectCard'
import { projects } from '../../data/projects'

export default function Projects() {
  return (
    <section>
      <section>
        <div className="flex flex-col gap-[3px]">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </section>
  )
}
