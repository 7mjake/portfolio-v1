import NextLink from 'next/link'
import clsx from 'clsx'

export default function Link({ className, children, ...props }) {
  return (
    <NextLink
      className={clsx(
        className,
        'w-fit rounded-lg hover:scale-105',
        !props.button &&
          'hover:bg-primary/10 hover:outline-primary/10 -translate-x-2 px-2 transition-transform hover:outline-4'
      )}
      {...props}
    >
      {children}
    </NextLink>
  )
}
