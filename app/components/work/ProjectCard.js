import Image from 'next/image'
import clsx from 'clsx'
import { Lock } from 'feather-icons-react'

export default function ProjectCard({ project }) {
  return (
    <div
      className={clsx(
        'outline-primary p-4] flex flex-row outline-3 outline-solid',
        project.id % 2 === 0 && 'flex-row-reverse'
      )}
    >
      <div className="relative w-1/2">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={500}
          className="w-full object-cover drop-shadow-2xl"
        />
        <div className="from-background/50 to-background/50 absolute inset-0 bg-linear-to-t from-1% via-transparent to-99%"></div>
      </div>
      <div className="flex w-1/2 flex-col justify-center gap-6 p-8">
        <h3 className="font-newake text-primary -mb-5 text-6xl font-medium tracking-wide uppercase">
          {project.title}
        </h3>
        <p className="text-lg">{project.description}</p>
        <div className="flex flex-wrap gap-[3px]">
          {project.tags.map(tag => (
            <span
              className="text-primary outline-primary px-2 font-medium outline-3 outline-solid"
              key={tag}
            >
              {tag}
            </span>
          ))}
          {project.locked && (
            <span className="text-primary outline-primary flex flex-row items-center gap-2 px-2 font-medium outline-3 outline-solid">
              <Lock className="h-3 w-3" /> Password required
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
