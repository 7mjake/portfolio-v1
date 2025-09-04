import clsx from 'clsx'

export default function SkillBox(props) {
  return (
    <div
      className={clsx(
        'outline-primary flex min-h-40 flex-col justify-center gap-2 p-8 outline-3 outline-solid',
        props.align === 'left' ? 'items-left' : 'items-center text-center'
      )}
    >
      <props.icon className="text-primary size-10" />
      {props.children}
    </div>
  )
}
