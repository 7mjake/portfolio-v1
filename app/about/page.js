import Container from '../components/global/Container'
import Image from 'next/image'

export default function About() {
  return (
    <main>
      <Container fullWidth>
        <section>
          <Image
            src="/images/about/headshot.jpeg"
            alt="Jake Martin"
            aspectRatio={1}
            width={500}
            height={500}
            className="w-full"
          />
        </section>
      </Container>
    </main>
  )
}
