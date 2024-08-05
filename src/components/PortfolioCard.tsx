import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const PortfolioCard = ({
    imgSrc,
    title,
    description,
    testimonial,
    testimonialAuthor,
    href,
}: {
    imgSrc: string
    title: ReactNode
    description: string
    testimonial?: string
    testimonialAuthor?: string
    href?: string
}) => {
    return (
        <div className='w-full'>
            <div className='text-center'>{title}</div>

            <p className='text-center italic mb-4'>{description}</p>
            <div className='flex lg:flex-row flex-col'>
                <div
                    className={`peer relative w-full h-[180px] md:min-w-[333px] md:h-[225px] rounded-lg md:hover:scale-110 transition-all mt-4 mb-4 ${
                        href ? 'cursor-pointer' : 'cursor-default'
                    }`}
                >
                    {href ? (
                        <div className='absolute z-10 top-0 left-0 right-0 bottom-0 opacity-0 hover:opacity-75 transition-opacity align-middle bg-zinc-300 rounded-lg'>
                            <Link href={href} target='_blank'>
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
                    ) : (
                        <div className='absolute z-10 top-0 left-0 right-0 bottom-0 opacity-75 text-center flex bg-zinc-100'>
                            <h3 className='m-auto'>🚧 Under Construction 🚧</h3>
                        </div>
                    )}

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
                {testimonial && testimonialAuthor && (
                    <div className='lg:peer-hover:translate-x-8 peer-hover:translate-y-4 lg:peer-hover:translate-y-0 transition-all flex flex-col w-full'>
                        <Image
                            className='md:translate-x-2'
                            src='/icons/quote.png'
                            alt=''
                            width={50}
                            height={50}
                        />
                        <div className='md:translate-x-6 ml-1 md:ml-0 font-quote'>
                            <p>{testimonial}</p>
                            <p>{testimonialAuthor}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PortfolioCard
