import clsx from 'clsx'

export default function SkillBox(props) {
  return (
    <div
      className={clsx(
        'boxify flex min-h-40 flex-col justify-center gap-2 p-8',
        props.align === 'left' ? 'items-left' : 'items-center text-center'
      )}
    >
      <props.icon className="text-primary size-10" />
      {props.children}
    </div>
  )
}
