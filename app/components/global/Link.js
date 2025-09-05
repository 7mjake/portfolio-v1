import NextLink from 'next/link'
import clsx from 'clsx'

export default function Link({
  className,
  children,
  button = false,
  ...props
}) {
  return (
    <NextLink
      className={clsx(
        className,
        'w-fit rounded-lg transition-transform hover:scale-105',
        !button &&
          'hover:bg-primary/10 hover:outline-primary/10 -translate-x-2 px-2 hover:outline-4'
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
