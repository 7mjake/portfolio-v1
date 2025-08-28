import Image from 'next/image'
import clsx from 'clsx'

export default function ProjectCard({ project }) {
    return (
        <div className={clsx(
            "flex flex-row outline outline-3 outline-primary p-4]",
            project.id % 2 === 0 && "flex-row-reverse"
        )}>
            <Image 
                src={project.image} 
                alt={project.title} 
                width={200}
                height={150}
                className="w-1/2 object-cover"
            />
            <div className="flex flex-col w-1/2 p-8 justify-center gap-4">
                <h3 className="text-6xl font-climate-crisis text-primary">{project.title}</h3>
                <p className="text-gray-500">{project.description}</p>
                <div className="flex flex-row gap-[3px]">
                    {project.tags.map((tag) => (
                        <span className="text-primary font-medium outline outline-3 outline-primary px-2" key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}