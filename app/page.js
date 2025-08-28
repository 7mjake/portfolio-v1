import { Layout, GitPullRequest, Box, Target, Move, Users, Smile } from 'feather-icons-react'
import ProjectCard from './components/work/ProjectCard'
import { projects } from './data/projects'
import Container from './components/global/Container'
import HeroBackground from './components/work/HeroBackground'
import SkillBox from './components/global/SkillBox'

export default function Home() {
  return (
    <main className="flex flex-col gap-40 py-40">
      {/* <Image src='/images/shadows.png' alt='Shadows' width={1440} height={1200} className='absolute top-0 left-0 z-10 w-full opacity-75 mix-blend-multiply pointer-events-none' /> */}
      <HeroBackground />
      <Container>
        <section className="flex flex-col items-center gap-10">
          <h1 className="text-3xl text-primary">Jake Martin</h1>
          <h2 className="font-climate-crisis text-8xl text-center text-primary">designer/<br />developer/<br />maker</h2>
        </section>
      </Container>

      <Container>
        <section>
          <div className="grid grid-cols-3 gap-[3px]">
            <SkillBox icon={Layout} align="right" title="I design powerful products." description="" />
            <SkillBox icon={GitPullRequest} align="right" title="I ship production code." description="" />
            <SkillBox icon={Box} align="right" title="I build elegant systems." description="" />
          </div>
        </section>
      </Container>

      <Container>
        <section>
          <div className="flex flex-col outline outline-3 outline-primary gap-[3px]">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section>
          <h2>My core values</h2>
          <div className="grid grid-cols-2 gap-[3px]">
            <SkillBox
              icon={Target}
              align="left"
              title="Intentionality"
              description="I fixate on a shared vision and frame every step of the process towards achieving it. This means prioritizing only the most impactful activities that align with our outcomes."
            />
            <SkillBox
              icon={Move}
              align="left"
              title="Experimentation"
              description="Nothing is sacred to me. I question assumptions, explore new ideas, and iterate in search of the best solutions."
            />
            <SkillBox
              icon={Users}
              align="left"
              title="Collaboration"
              description="I believe we do our best work when we do it together. I strive to be a multiplier on my teams and I'm not afraid to blur the lines between roles."
            />
            <SkillBox
              icon={Smile}
              align="left"
              title="Buoyancy"
              description="All work and no play makes Jake a dull boy. I like to keep things light and inject a healthy dose of humor and energy into everything I do."
            />
          </div>
        </section>
      </Container>
    </main>
  )
}
