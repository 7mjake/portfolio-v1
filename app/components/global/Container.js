import clsx from 'clsx'

export default function Container({
  children,
  fullWidth = false,
  gutter = true,
  className,
}) {
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
