import clsx from 'clsx'
import type { ReactNode } from 'react'
import Container from './Container'

const spacing = {
  default: 'py-20 md:py-32',
  compact: 'py-12 md:py-20',
  none: '',
}

type PageSectionProps = {
  children: ReactNode
  className?: string
  containerClassName?: string
  spacing?: keyof typeof spacing
}

export default function PageSection({
  children,
  className,
  containerClassName,
  spacing: spacingVariant = 'default',
}: PageSectionProps) {
  return (
    <section className={clsx(spacing[spacingVariant], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
