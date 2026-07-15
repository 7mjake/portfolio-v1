import clsx from 'clsx'

const styles = {
  hero: 'font-newake text-primary text-[18vw] leading-[0.75] font-medium uppercase md:text-[10rem]',
  section: 'font-newake text-primary text-6xl font-medium tracking-wide uppercase',
  card: 'font-newake text-primary text-6xl font-medium tracking-wide uppercase',
  label: 'font-newake text-primary text-2xl font-medium tracking-wide uppercase',
}

export default function Heading({
  as: Tag = 'h2',
  children,
  className,
  variant = 'section',
}) {
  return <Tag className={clsx(styles[variant], className)}>{children}</Tag>
}
