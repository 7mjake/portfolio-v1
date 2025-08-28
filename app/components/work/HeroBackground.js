import UnicornHero from './UnicornHero'

export default function HeroBackground() {
    return (
        <div className='fixed flex flex-col top-0 left-0 z-10 w-full opacity-100 mix-blend-multiply pointer-events-none'>
            <div className='z-0'>
                <UnicornHero />
            </div>
            <div className='absolute bg-gradient-to-t from-white h-full w-full' />

            <div className='absolute bottom-0 bg-gradient-to-t from-white h-[300px] w-full' />
        </div>
    )
}