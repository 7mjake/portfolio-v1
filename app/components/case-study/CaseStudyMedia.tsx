import Image from 'next/image'
import clsx from 'clsx'
import type { CaseStudyMedia as CaseStudyMediaType } from '../../data/caseStudies'
import VideoMedia from './VideoMedia'

type CaseStudyMediaProps = {
  media: CaseStudyMediaType
  width?: 'contained' | 'wide' | 'full'
  priority?: boolean
}

export default function CaseStudyMedia({
  media,
  width = 'wide',
  priority = false,
}: CaseStudyMediaProps) {
  return (
    <figure
      className={clsx(
        'mx-auto w-full overflow-hidden',
        width === 'contained' && 'max-w-3xl',
        width === 'wide' && 'max-w-5xl',
        width === 'full' && 'max-w-none'
      )}
    >
      <div>
        {media.kind === 'image' ? (
          <Image
            src={media.src}
            alt={media.alt}
            width={media.width}
            height={media.height}
            sizes="(max-width: 768px) 100vw, 1024px"
            priority={priority}
            className="h-auto w-full object-contain"
          />
        ) : (
          <VideoMedia media={media} />
        )}
      </div>
      {media.caption && (
        <figcaption className="border-primary border-t-[3px] px-4 py-3 text-sm">
          {media.caption}
        </figcaption>
      )}
    </figure>
  )
}
