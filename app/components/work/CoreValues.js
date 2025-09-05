import Container from '../global/Container'
import SkillBox from '../global/SkillBox'
import { Target, Move, Users, Smile } from 'feather-icons-react'

export default function CoreValues() {
  return (
    <section>
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
    </section>
  )
}
