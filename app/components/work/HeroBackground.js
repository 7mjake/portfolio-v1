import UnicornHero from './UnicornHero'

export default function HeroBackground() {
    return (
        <div className='absolute flex flex-col top-0 left-0 z-10 w-full opacity-0 mix-blend-multiply pointer-events-none animate-[fadeIn_2s_ease-in-out_0.5s_forwards]'>
            <div className='z-0'>
                <UnicornHero />
            </div>
            <div className='absolute bg-gradient-to-t from-white h-full w-full' />

            <div className='absolute bottom-0 bg-gradient-to-t from-white h-[300px] w-full' />
        </div>
    )
}