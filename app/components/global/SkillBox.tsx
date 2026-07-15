import clsx from 'clsx'
import type { ComponentType, ReactNode, SVGProps } from 'react'

type SkillBoxProps = {
  align?: 'left' | 'center'
  children: ReactNode
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export default function SkillBox({
  align = 'left',
  children,
  icon: Icon,
}: SkillBoxProps) {
  return (
    <div
      className={clsx(
        'bg-background flex min-h-40 flex-col justify-center gap-2 p-8',
        align === 'left' ? 'items-start' : 'items-center text-center'
      )}
    >
      <Icon className="text-primary size-10" aria-hidden="true" />
      {children}
    </div>
  )
}
