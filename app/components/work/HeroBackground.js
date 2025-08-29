import UnicornHero from './UnicornHero'

export default function HeroBackground() {
    return (
        <div className='absolute flex flex-col top-0 left-0 z-10 w-full mix-blend-multiply pointer-events-none'>
            <div className='z-0'>
                <UnicornHero />
            </div>
            {/* <div className='absolute bg-linear-to-t from-white h-full w-full' /> */}

            <div className='absolute bottom-0 bg-linear-to-tr from-white/25 to-transparent h-full w-full' />

            <div className='absolute bottom-0 bg-linear-to-t from-white h-[100px] w-full' />
            <div className='absolute bottom-0 bg-linear-to-t from-white h-[200px] w-full' />
            <div className='absolute bottom-0 bg-linear-to-t from-white h-[300px] w-full' />
        </div>
    )
}