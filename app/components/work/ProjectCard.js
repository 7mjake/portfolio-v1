import Image from 'next/image'
import clsx from 'clsx'
import { Lock } from 'feather-icons-react'

export default function ProjectCard({ project }) {
    return (
        <div className={clsx(
            "flex flex-row outline-solid outline-3 outline-primary p-4]",
            project.id % 2 === 0 && "flex-row-reverse"
        )}>
            <div className="relative w-1/2">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={500}
                    className="w-full object-cover drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/50 from-1% via-transparent to-99% to-background/50"></div>
            </div>
            <div className="flex flex-col w-1/2 p-8 justify-center gap-6">
                <h3 className="text-6xl font-newake uppercase font-medium tracking-wide -mb-5 text-primary">{project.title}</h3>
                <p className="text-lg">{project.description}</p>
                <div className="flex flex-wrap gap-[3px]">
                    {project.tags.map((tag) => (
                        <span className="text-primary font-medium outline-solid outline-3 outline-primary px-2" key={tag}>{tag}</span>
                    ))}
                    {project.locked && <span className="text-primary font-medium outline-solid outline-3 outline-primary px-2 flex flex-row gap-2 items-center"><Lock className="w-3 h-3" /> Password required</span>}
                </div>
            </div>
        </div>
    )
}