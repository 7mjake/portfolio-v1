import clsx from 'clsx'

export default function SkillBox(props) {
    return (
        <div className={clsx("flex flex-col justify-center gap-2 p-8 outline-solid outline-3 outline-primary min-h-40", props.align === "left" ? "items-left" : "items-center text-center")}>
            <props.icon className="text-primary size-10" />
            {props.children}
        </div>
    )
}
