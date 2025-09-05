import HeroSection from './components/work/HeroSection'
import CoreValues from './components/work/CoreValues'
import Projects from './components/work/Projects'

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

      <Projects />

      <CoreValues />
    </main>
  )
}
