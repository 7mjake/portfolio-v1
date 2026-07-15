import Image from 'next/image'
import clsx from 'clsx'
import Container from '../global/Container'
import Heading from '../global/Heading'
import Link from '../global/Link'
import StatusChip, { StatusChipGroup } from '../global/StatusChip'
import type { ProjectCard as Project } from '../../types/content'

type ProjectCardProps = {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isPrivate = project.access === 'private'

  const cardContent = (
    <>
      <div className="relative w-full md:w-1/2">
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={500}
          height={500}
          className="w-full object-cover drop-shadow-2xl"
        />
        <div className="from-background/50 to-background/50 pointer-events-none absolute inset-0 bg-linear-to-t from-1% via-transparent to-99%" />
      </div>
      <div className="flex w-full flex-col justify-center gap-6 px-4 py-8 md:w-1/2 md:p-8">
        <Heading as="h3" variant="card" className="-mb-5">
          {project.title}
        </Heading>
        <p className="text-lg">{project.description}</p>
        <StatusChipGroup>
          {project.tags.map(tag => (
            <StatusChip key={tag}>{tag}</StatusChip>
          ))}
          {isPrivate && <StatusChip locked>Password required</StatusChip>}
          {project.access === 'in-progress' && (
            <StatusChip>Case study in progress</StatusChip>
          )}
        </StatusChipGroup>
      </div>
    </>
  )

  const cardClasses = clsx(
    'border-primary flex w-full flex-col border-x-[3px] border-b-[3px] md:flex-row',
    index === 0 && 'border-t-[3px]',
    index % 2 === 1 && 'md:flex-row-reverse'
  )

  return (
    <Container gutter={false}>
      {project.href ? (
        <Link
          href={project.href}
          className={cardClasses}
          animate={false}
          rounded={false}
        >
          {cardContent}
        </Link>
      ) : (
        <article
          className={cardClasses}
          aria-label={`${project.title} case study`}
        >
          {cardContent}
        </article>
      )}
    </Container>
  )
}
