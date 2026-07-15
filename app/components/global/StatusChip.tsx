import clsx from 'clsx'
import { Lock } from 'feather-icons-react'
import type { ReactNode } from 'react'

type StatusChipProps = {
  children: ReactNode
  locked?: boolean
  className?: string
}

type StatusChipGroupProps = {
  children: ReactNode
  className?: string
}

export function StatusChipGroup({ children, className }: StatusChipGroupProps) {
  return (
    <div className={clsx('flex flex-wrap pr-[3px] pb-[3px]', className)}>
      {children}
    </div>
  )
}

export default function StatusChip({
  children,
  locked = false,
  className,
}: StatusChipProps) {
  return (
    <span
      className={clsx(
        'border-primary text-primary -mr-[3px] -mb-[3px] flex items-center gap-2 border-[3px] px-2 font-medium',
        className
      )}
    >
      {locked && <Lock className="size-3" aria-hidden="true" />}
      {children}
    </span>
  )
}
