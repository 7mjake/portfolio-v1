import clsx from 'clsx'

export default function SkillBox({ align = 'left', children, icon: Icon }) {
  return (
    <div
      className={clsx(
        'outline-primary flex min-h-40 flex-col justify-center gap-2 p-8 outline-3 outline-solid',
        align === 'left' ? 'items-start' : 'items-center text-center'
      )}
    >
      <Icon className="text-primary size-10" aria-hidden="true" />
      {children}
    </div>
  )
}
