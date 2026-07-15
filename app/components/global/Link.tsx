import NextLink from 'next/link'
import clsx from 'clsx'
import type { ComponentProps, ReactNode } from 'react'

type LinkProps = Omit<
  ComponentProps<typeof NextLink>,
  'children' | 'className'
> & {
  children: ReactNode
  className?: string
  animate?: boolean
  rounded?: boolean
  variant?: 'text' | 'button'
}

export default function Link({
  className,
  children,
  animate = true,
  rounded = true,
  variant = 'text',
  ...props
}: LinkProps) {
  return (
    <NextLink
      className={clsx(
        'focus-visible:ring-primary focus-visible:ring-offset-background transition duration-150 outline-none focus-visible:ring-3 focus-visible:ring-offset-2',
        rounded && 'rounded-lg',
        variant === 'button'
          ? 'w-fit'
          : 'hover:bg-primary/10 hover:outline-primary/10 w-fit px-2 hover:outline-4',
        animate && 'hover:scale-105',
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
