import NextLink from 'next/link'
import clsx from 'clsx'

export default function Link({
  className,
  children,
  animate = true,
  variant = 'text',
  ...props
}) {
  return (
    <NextLink
      className={clsx(
        'focus-visible:ring-primary rounded-lg outline-none transition duration-150 focus-visible:ring-3 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variant === 'button'
          ? 'w-fit'
          : 'w-fit px-2 hover:bg-primary/10 hover:outline-primary/10 hover:outline-4',
        animate && 'hover:scale-105',
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
