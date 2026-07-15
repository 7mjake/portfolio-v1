import UnicornHero from './UnicornHero'

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute top-0 left-0 z-10 flex w-full flex-col mix-blend-multiply motion-reduce:hidden">
      <div className="z-0">
        <UnicornHero />
      </div>
      {/* <div className='absolute bg-linear-to-t from-white h-full w-full' /> */}

      <div className="absolute bottom-0 h-full w-full bg-linear-to-tr from-white/25 to-transparent" />

      <div className="absolute bottom-0 h-[100px] w-full bg-linear-to-t from-white" />
      <div className="absolute bottom-0 h-[200px] w-full bg-linear-to-t from-white" />
      <div className="absolute bottom-0 h-[300px] w-full bg-linear-to-t from-white" />
    </div>
  )
}
