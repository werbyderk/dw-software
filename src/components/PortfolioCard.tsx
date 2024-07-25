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
        <div className='w-full'>
            <h3 className='text-center font-lemon text-green-700'>{title}</h3>
            <p className='text-center italic mb-4'>{description}</p>
            <div className='flex lg:flex-row flex-col'>
                <div className='peer relative w-full h-[180px] md:min-w-[333px] md:h-[225px] rounded-lg md:hover:scale-110 transition-all mt-4 mb-4 cursor-pointer'>
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
                    <div>
                        <Image
                            src={imgSrc}
                            alt='Portfolio preview'
                            className='absolute rounded-lg'
                            objectFit='cover'
                            fill
                        />
                    </div>
                </div>
                <div className='lg:peer-hover:translate-x-8 peer-hover:translate-y-4 lg:peer-hover:translate-y-0 transition-all flex flex-col w-full'>
                    <Image
                        className='md:translate-x-2'
                        src='/icons/quote.png'
                        alt=''
                        width={50}
                        height={50}
                    />
                    <div className='md:translate-x-6 ml-1 md:ml-0 font-quote'>
                        <p>
                            Derek was instrumental in the successful development of our website. He
                            took what was essentially a PowerPoint presentation and turned it into
                            an attractive, user-friendly, desktop and mobile friendly, website. He
                            has a great talent for understanding our needs and putting them into
                            action. Highly recommend!
                        </p>
                        <p>- Phil Gonzalez, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioCard
