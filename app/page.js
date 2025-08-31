import { Layout, GitPullRequest, Box, Target, Move, Users, Smile } from 'feather-icons-react'
import ProjectCard from './components/work/ProjectCard'
import { projects } from './data/projects'
import Container from './components/global/Container'
import HeroBackground from './components/work/HeroBackground'
import SkillBox from './components/global/SkillBox'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'feather-icons-react'

export default function Home() {
  return (
    <main className="flex flex-col gap-40 py-40">
      <div
        className="absolute w-full h-[1000px] bg-center -z-50 top-0 pointer-events-none hidden dark:block"
        style={{
          backgroundImage: "url('/images/noise-hero-dark.png')",
          backgroundSize: 'var(--noise-size) var(--noise-size)',
        }}
        aria-hidden="true"
      />
      <HeroBackground />
      <Container>
        <section className="flex flex-col gap-10">
          <h1 className="text-3xl font-semibold text-secondary">Jake Martin</h1>
          <h2 className="font-newake uppercase font-medium text-[10rem] text-center text-primary mt-5 leading-[0.75]">Designer<br />Developer<br />Maker</h2>

          <h3 className="text-3xl font-semibold text-secondary text-right">New York City</h3>
        </section>
      </Container>

      <Container>
        <section className="flex flex-col gap-8">
          <p className="text-4xl font-medium text-primary w-5/6">I&apos;m a multidisciplinary product designer driven by a passion for cross-functional collaboration, fostering design culture, and simplifying complexity.</p>
          <p className="text-xl font-medium text-secondary w-5/6 flex items-center gap-1">Currently building AI at <a href="https://fleetio.com/" target="_blank" rel="noopener noreferrer" className="py-1 px-2 rounded-lg bg-primary/5 hover:bg-primary/15 transition-colors cursor-pointer  text-primary flex w-fit items-center gap-0">Fleetio <ArrowUpRight className="size-6" /></a></p>

        </section>
      </Container>

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

      <Container>
        <section>
          <div className="flex flex-col outline-solid outline-3 outline-primary gap-[3px]">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section>
          <h2 className='text-4xl font-bold text-primary mb-6'>My core values</h2>
          <div className="grid grid-cols-2 gap-[3px]">
            <SkillBox icon={Target} align="left">
              <h3 className="text-2xl font-bold text-primary">Intentionality</h3>
              <p className="text-lg">I fixate on a shared vision and frame every step of the process towards achieving it. This means prioritizing only the most impactful activities that align with our outcomes.</p>
            </SkillBox>
            <SkillBox icon={Move} align="left">
              <h3 className="text-2xl font-bold text-primary">Experimentation</h3>
              <p className="text-lg">Nothing is sacred to me. I question assumptions, explore new ideas, and iterate in search of the best solutions.</p>
            </SkillBox>
            <SkillBox icon={Users} align="left">
              <h3 className="text-2xl font-bold text-primary">Collaboration</h3>
              <p className="text-lg">I believe we do our best work when we do it together. I strive to be a multiplier on my teams and I&apos;m not afraid to blur the lines between roles.</p>
            </SkillBox>
            <SkillBox icon={Smile} align="left">
              <h3 className="text-2xl font-bold text-primary">Buoyancy</h3>
              <p className="text-lg">All work and no play makes Jake a dull boy. I like to keep things light and inject a healthy dose of humor and energy into everything I do.</p>
            </SkillBox>
          </div>
        </section>
      </Container>
    </main>
  )
}
