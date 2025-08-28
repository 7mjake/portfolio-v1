import Image from 'next/image'
import clsx from 'clsx'

export default function ProjectCard({ project }) {
    return (
        <div className={clsx(
            "flex flex-row border-2 border-gray-300 rounded-md p-4",
            project.id % 2 === 0 && "flex-row-reverse"
        )}>
            <Image 
                src={project.image} 
                alt={project.title} 
                width={200}
                height={150}
                className="w-1/2 object-cover"
            />
            <div className="flex flex-col w-1/2">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-gray-500">{project.description}</p>
                <div className="flex flex-row gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}