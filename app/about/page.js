import Image from 'next/image'

export default function About() {
  return (
    <main>
      <Image
        src="/images/about/headshot.jpeg"
        alt="Jake Martin"
        width={500}
        height={500}
        className="w-full"
        priority
      />
    </main>
  )
}
