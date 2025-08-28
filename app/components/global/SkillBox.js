import clsx from 'clsx'

export default function SkillBox(props) {
    return (
        <div className={clsx("flex flex-col justify-center gap-2 p-4 outline outline-3 outline-primary min-h-40", props.align === "left" ? "items-left" : "items-center")}>
            <props.icon className="text-primary size-10" />
            <h3 className='text-xl'>{props.title}</h3>
            {props.description && <p>{props.description}</p>}
        </div>
    )
}
