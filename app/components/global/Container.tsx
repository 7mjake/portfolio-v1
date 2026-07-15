import clsx from 'clsx'
import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  fullWidth?: boolean
  gutter?: boolean
  className?: string
}

export default function Container({
  children,
  fullWidth = false,
  gutter = true,
  className,
}: ContainerProps) {
  if (fullWidth) {
    return <div>{children}</div>
  }

  return (
    <div
      className={clsx(
        'relative mx-auto flex w-full max-w-5xl flex-col',
        gutter && 'px-4 md:px-0',
        className
      )}
    >
      {children}
    </div>
  )
}
