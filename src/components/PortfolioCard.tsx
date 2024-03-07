import Image from 'next/image'
import Link from 'next/link'

const PortfolioCard = ({
    imgSrc,
    title,
    description,
}: {
    imgSrc: string
    title: string
    description: string
}) => {
    return (
        <div className='w-min'>
            <h3 className='text-center font-lemon text-green-700'>{title}</h3>
            <div className='relative w-[266px] h-[180px] md:w-[333px] md:h-[225px] rounded-lg md:hover:scale-110 transition-all mt-4 mb-4 cursor-pointer'>
                <div className='absolute z-10 top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-75 transition-opacity align-middle bg-zinc-300 rounded-lg'>
                    <Link href='https://www.greenvillebiketaxi.com' target='_blank'>
                        <div className='flex align-middle h-full'>
                            <Image
                                alt='Open'
                                className='m-auto'
                                src='/icons/open-tab.svg'
                                width={50}
                                height={50}
                            />
                        </div>
                    </Link>
                </div>
                <Image
                    src={imgSrc}
                    alt='Portfolio preview'
                    className='absolute rounded-lg'
                    objectFit='cover'
                    fill
                />
            </div>
            <p className='text-center italic'>{description}</p>
        </div>
    )
}

export default PortfolioCard
