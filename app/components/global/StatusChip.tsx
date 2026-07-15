import clsx from 'clsx'
import { Lock } from 'feather-icons-react'
import type { ReactNode } from 'react'

type StatusChipProps = {
  children: ReactNode
  locked?: boolean
  className?: string
}

export default function StatusChip({ children, locked = false, className }: StatusChipProps) {
  return (
    <span
      className={clsx(
        'outline-primary text-primary flex items-center gap-2 px-2 font-medium outline-3 outline-solid',
        className
      )}
    >
      {locked && <Lock className="size-3" aria-hidden="true" />}
      {children}
    </span>
  )
}
