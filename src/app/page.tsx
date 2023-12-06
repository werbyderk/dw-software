'use client'
import { useEffect, useState } from 'react'
import FeatureCarousel from '@/components/FeatureCarousel'
import { Tooltip } from 'react-tooltip'
import { motion, useSpring, useTransform } from 'framer-motion'
import LightSwitch from '@/components/LightSwitch'
import FeatureButton from '@/components/FeatureButton'
import UnderConstruction from '@/components/UnderConstruction'

const clientWindow = typeof window === 'undefined' ? { innerWidth: 0 } : window

export default function Home() {
    const [hoverMern, setHoverMern] = useState(false)
    const [spinnerSpeed, setSpinnerSpeed] = useState<number | undefined>(10)
    const [width, setWidth] = useState<number>(clientWindow.innerWidth)
    const mernSpring = useSpring(1)

    const handleWindowSizeChange = () => {
        setWidth(clientWindow.innerWidth)
    }

    const updateSpinSpeed = () => {
        setTimeout(() => {
            console.debug(spinnerSpeed)
            setSpinnerSpeed((prev) => {
                if (!prev || prev > 1000) return
                updateSpinSpeed()
                return prev * 1.1
            })
        }, 70)
    }

    useEffect(() => {
        updateSpinSpeed()
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    useEffect(() => {
        if (hoverMern) mernSpring.set(1.2)
        else mernSpring.set(1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoverMern])

    // useEffect(() => {
    //     console.debug(spinnerSpeed)
    // })
    const isMobile = width <= 930

    const renderHero = () => {
        if (isMobile) {
            return (
                <div className='flex justify-center mb-24'>
                    <div>
                        <h2 className=''>DEREK</h2>
                        <span className='flex leading-[1]'>
                            <h2 className='font-[200]'>WERBOWY SOFT SOLUTIONS</h2>
                        </span>
                    </div>
                </div>
            )
        }
        return (
            <div className='flex justify-center mb-24'>
                <div>
                    <h1 className=''>DEREK</h1>
                    <span className='flex leading-[1]'>
                        <h1 className='font-[200]'>WERBOWY</h1>
                        <h1>&nbsp;</h1>
                        <h1 className='leading-none'>SOFT SOLUTIONS</h1>
                    </span>
                </div>
            </div>
        )
    }
    return (
        <main className='p-2 w-full overflow-x-hidden'>
            <UnderConstruction compact={isMobile} />
            <div
                style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '2rem',
                    backgroundColor: '#47A2E8',
                    background: 'radial-gradient(at right bottom, #47A2E8, #1CDBB6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
                className='pl-8'
            >
                {renderHero()}
                <div className='z-10'>
                    <FeatureCarousel customSpinTime={spinnerSpeed} compact={isMobile} />
                </div>
            </div>
            <div style={{ fontSize: '1.5rem' }} className='p-12 text-center'>
                <Tooltip
                    id='mern'
                    place='bottom'
                    style={{ maxWidth: '40rem' }}
                    content=''
                    render={() => (
                        <p className='text-center'>
                            The MongoDB, Express.js, React.js, Node.js tech stack enables the
                            development of flexible and modern applications for end users or
                            internal organization use
                        </p>
                    )}
                />
                <span>{`Hi, I'm Derek. I help small businesses local to `}</span>
                <a href='https://www.google.com/search?q=%23yeahthatgreenville' target='_blank'>
                    {' '}
                    <span className='cursor-pointer duration-300 hover:text-green-600'>
                        #yeahthatgreenville{' '}
                    </span>
                </a>
                <span>succeed on and offline with </span>
                {/* <motion.div
                    // whileHover={{ scale: 1.2 }}
                    className='inline-block'
                    // className='inline-block hover:scale-[1.15] transition-transform'
                    style={{ scale: mernSpring }}
                    onMouseEnter={() => setHoverMern(true)}
                    onMouseLeave={() => setHoverMern(false)}
                >
                    <span data-tooltip-id='mern' className='font-bold cursor-default '>
                        MERN
                    </span>
                </motion.div> */}
                <span>{` applications that fit their needs. 
                Whether you want to expand your online presence with an eye-catching website or optimize 
                your daily work with software tailored to your needs, I'm here to help.`}</span>
            </div>

            <div
                className={`pb-8 flex justify-between m-auto ${
                    isMobile ? 'w-[300px]' : 'w-[450px]'
                }`}
            >
                <FeatureButton
                    target='https://calendly.com/derek-werbowy-soft-solutions/consultation'
                    text='Book a time'
                    compact={isMobile}
                />
                <FeatureButton
                    target='mailto:dw.soft.solutions@gmail.com'
                    text='Send me an email'
                    compact={isMobile}
                />
            </div>
            {!isMobile && <LightSwitch />}
        </main>
    )
}
