'use client'

import { Pause, Play } from 'feather-icons-react'
import { useRef, useState } from 'react'
import type { VideoMedia as VideoMediaType } from '../../data/caseStudies'

type VideoMediaProps = {
  media: VideoMediaType
}

export default function VideoMedia({ media }: VideoMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = async () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      await video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className="relative overflow-hidden">
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        aria-label={media.label}
        autoPlay
        muted
        loop
        playsInline
        className="h-auto w-full"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        onClick={togglePlayback}
        className="bg-background text-primary focus-visible:ring-primary absolute right-4 bottom-4 flex size-12 items-center justify-center rounded-full shadow-lg transition outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-offset-2"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <Pause className="size-5" aria-hidden="true" />
        ) : (
          <Play className="size-5" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
