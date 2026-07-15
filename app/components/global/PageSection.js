import clsx from 'clsx'
import Container from './Container'

const spacing = {
  default: 'py-20 md:py-32',
  compact: 'py-12 md:py-20',
  none: '',
}

export default function PageSection({
  children,
  className,
  containerClassName,
  spacing: spacingVariant = 'default',
}) {
  return (
    <section className={clsx(spacing[spacingVariant], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
