import {
  Layout,
  GitPullRequest,
  Box,
  Target,
  Move,
  Users,
  Smile,
} from 'feather-icons-react'
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
        className="pointer-events-none absolute top-0 -z-50 hidden h-[1000px] w-full bg-center dark:block"
        style={{
          backgroundImage: "url('/images/noise-hero-dark.png')",
          backgroundSize: 'var(--noise-size) var(--noise-size)',
        }}
        aria-hidden="true"
      />
      <HeroBackground />
      <Container>
        <section className="flex flex-col gap-10 text-center">
          <h1 className="text-secondary text-3xl font-semibold">Jake Martin</h1>

          <h2 className="font-newake text-primary mt-5 text-[10rem] leading-[0.75] font-medium uppercase">
            Designer
            <br />
            Developer
            <br />
            Maker
          </h2>

          {/* <div className="font-newake uppercase font-medium text-[10rem] text-primary mt-5 leading-[0.75]">
            <h2 className="">Designer</h2>
            <h2 className="text-center">Developer</h2>
            <h2 className="text-right">Maker</h2>
          </div> */}

          <h3 className="text-secondary text-3xl font-semibold">
            New York City
          </h3>
        </section>
      </Container>

      <Container>
        <section className="flex flex-col gap-8">
          <p className="text-secondary w-5/6 text-4xl leading-normal font-medium">
            👋🏼 Howdy! I&apos;m glad you&apos;re here. Keep scrolling to see my
            favorite projects, check out what I do for{' '}
            <span className="inline-flex">
              <Link
                href="/fun"
                className="bg-primary/5 hover:bg-primary/20 text-primary inline-block h-fit w-fit cursor-pointer items-center gap-0 rounded-lg px-2 align-middle transition-colors"
              >
                fun,
              </Link>
            </span>{' '}
            or learn more{' '}
            <span className="inline-flex">
              <Link
                href="/about"
                className="bg-primary/5 hover:bg-primary/20 text-primary inline-block h-fit w-fit cursor-pointer items-center gap-0 rounded-lg px-2 align-middle transition-colors"
              >
                about me
              </Link>
            </span>{' '}
            here.
          </p>
          <p className="text-secondary flex w-5/6 items-center gap-1 text-xl font-medium">
            Currently building AI at{' '}
            <a
              href="https://fleetio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary/5 hover:bg-primary/20 text-primary flex w-fit cursor-pointer items-center gap-0 rounded-lg px-2 py-1 transition-colors"
            >
              Fleetio <ArrowUpRight className="size-6" />
            </a>
          </p>
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
          <div className="outline-primary flex flex-col gap-[3px] outline-3 outline-solid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section>
          <h2 className="text-primary mb-6 text-4xl font-bold">
            My core values
          </h2>
          <div className="grid grid-cols-2 gap-[3px]">
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
