import Image from 'next/image'
import NextLink from 'next/link'
import clsx from 'clsx'
import Heading from '../global/Heading'
import PageSection from '../global/PageSection'
import StatusChip, { StatusChipGroup } from '../global/StatusChip'
import type { ProjectCard } from '../../types/content'

type RelatedProjectsProps = {
  projects: ProjectCard[]
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null

  return (
    <PageSection containerClassName="gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-primary text-sm font-semibold tracking-wide uppercase">
          Want to see more?
        </p>
        <Heading as="h2" variant="projectSection">
          Check out another project
        </Heading>
      </div>
      <div className="border-primary bg-primary grid gap-[3px] border-[3px] md:grid-cols-2">
        {projects.map(project => {
          const content = (
            <>
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={600}
                height={600}
                className="aspect-square w-full object-cover"
              />
              <div className="flex flex-col gap-4 p-5 md:p-7">
                <Heading as="h3" variant="label">
                  {project.title}
                </Heading>
                <p className="text-lg">{project.description}</p>
                <StatusChipGroup>
                  {project.tags.map(tag => (
                    <StatusChip key={tag}>{tag}</StatusChip>
                  ))}
                </StatusChipGroup>
              </div>
            </>
          )

          const className = clsx(
            'bg-background flex flex-col',
            project.href &&
              'focus-visible:ring-primary transition hover:-translate-y-1 focus-visible:ring-3'
          )

          return project.href ? (
            <NextLink
              key={project.slug}
              href={project.href}
              className={className}
            >
              {content}
            </NextLink>
          ) : (
            <article key={project.slug} className={className}>
              {content}
            </article>
          )
        })}
      </div>
    </PageSection>
  )
}
