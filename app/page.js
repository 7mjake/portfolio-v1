import { Layout, GitPullRequest, Box } from 'feather-icons-react'
import ProjectCard from './components/work/ProjectCard'
import { projects } from './data/projects'
import Container from './components/global/Container'

function SkillBox(props) {
  return (
    <div className="flex flex-col items-center p-4">
      <props.icon />
      <p>{props.text}</p>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Container>
        <section className="flex flex-col items-center">
          <h1>Jake Martin</h1>
          <p>Designer / Developer / Maker</p>
        </section>
      </Container>
      
      <Container>
        <section className='flex flex-col items-center'>
          <div className="flex flex-row">
            <SkillBox icon={Layout} text="I design powerful products." />
            <SkillBox icon={GitPullRequest} text="I ship production code." />
            <SkillBox icon={Box} text="I build elegant systems." />
          </div>
        </section>
      </Container>
      
      <Container>
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Container>
    </main>
  )
}
