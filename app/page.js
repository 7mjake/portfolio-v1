import { Target, Move, Users, Smile } from 'feather-icons-react'
import ProjectCard from './components/work/ProjectCard'
import { projects } from './data/projects'
import Container from './components/global/Container'
import SkillBox from './components/global/SkillBox'
import HeroSection from './components/work/HeroSection'

export default function Home() {
  return (
    <main className="flex flex-col gap-40 py-40">
      <HeroSection />

      {/* <Container>
        <section>
          <div className="grid grid-cols-3 gap-[3px]">
            <SkillBox icon={Layout} align="right">
              <h3 className='text-3xl'>I design powerful products.</h3>
            </SkillBox>
            <SkillBox icon={GitPullRequest} align="right">
              <h3 className='text-3xl'>I ship production code.</h3>
            </SkillBox>
            <SkillBox icon={Box} align="right">
              <h3 className='text-3xl'>I build elegant systems.</h3>
            </SkillBox>
          </div>
        </section>
      </Container> */}

      <section>
        <div className="outline-primary flex flex-col gap-[3px]">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <Container>
        <section>
          <h2 className="text-primary mb-6 text-4xl font-bold">
            My core values
          </h2>
          <div className="grid grid-cols-1 gap-[3px] md:grid-cols-2">
            <SkillBox icon={Target} align="left">
              <h3 className="text-primary text-2xl font-bold">
                Intentionality
              </h3>
              <p className="text-lg">
                I fixate on a shared vision and frame every step of the process
                towards achieving it. This means prioritizing only the most
                impactful activities that align with our outcomes.
              </p>
            </SkillBox>
            <SkillBox icon={Move} align="left">
              <h3 className="text-primary text-2xl font-bold">
                Experimentation
              </h3>
              <p className="text-lg">
                Nothing is sacred to me. I question assumptions, explore new
                ideas, and iterate in search of the best solutions.
              </p>
            </SkillBox>
            <SkillBox icon={Users} align="left">
              <h3 className="text-primary text-2xl font-bold">Collaboration</h3>
              <p className="text-lg">
                I believe we do our best work when we do it together. I strive
                to be a multiplier on my teams and I&apos;m not afraid to blur
                the lines between roles.
              </p>
            </SkillBox>
            <SkillBox icon={Smile} align="left">
              <h3 className="text-primary text-2xl font-bold">Buoyancy</h3>
              <p className="text-lg">
                All work and no play makes Jake a dull boy. I like to keep
                things light and inject a healthy dose of humor and energy into
                everything I do.
              </p>
            </SkillBox>
          </div>
        </section>
      </Container>
    </main>
  )
}
