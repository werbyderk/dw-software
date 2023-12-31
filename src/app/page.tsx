'use client'
import { useEffect, useState, useRef } from 'react'
import FeatureCarousel from '@/components/FeatureCarousel'
import LightSwitch from '@/components/LightSwitch'
import FeatureButton from '@/components/FeatureButton'
// import UnderConstruction from '@/components/UnderConstruction'
import Dropdown from '@/components/Dropdown'
import { ArrowUpward } from '@mui/icons-material'

const clientWindow = typeof window === 'undefined' ? { innerWidth: 0 } : window

export default function Home() {
    const [spinnerSpeed, setSpinnerSpeed] = useState<number | undefined>(10)
    const [width, setWidth] = useState<number>(clientWindow.innerWidth)
    const [dropdownActive, setDropdownActive] = useState(false)
    const [pullMeVisible, setPullMeVisible] = useState(true)
    const mainRef = useRef()

    const handleLightSwitchPull = () => {
        setDropdownActive((prev) => !prev)
    }

    const handleWindowSizeChange = () => {
        setWidth(clientWindow.innerWidth)
    }

    useEffect(() => {
        const updateSpinSpeed = () => {
            setTimeout(() => {
                setSpinnerSpeed((prev) => {
                    if (!prev || prev > 1000) return
                    updateSpinSpeed()
                    return prev * 1.1
                })
            }, 70)
        }
        updateSpinSpeed()
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    const isMobile = width <= 1024

    const renderHero = () => {
        if (isMobile) {
            return (
                <div className='flex justify-center mb-24'>
                    <h3 className='font-[800] uppercase'>
                        Derek <br /> Werbowy Soft Solutions
                    </h3>
                </div>
            )
        }
        return (
            <div className='flex justify-center mb-24'>
                <div>
                    <h1 className='uppercase'>Derek</h1>
                    <div className='flex leading-[1]'>
                        <h1 className='font-[200] uppercase'>Werbowy</h1>
                        <h1>&nbsp;</h1>
                        <h1 className='leading-none uppercase'>Soft Solutions</h1>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main ref={mainRef as any} className='p-2 w-screen'>
            <LightSwitch
                onPull={handleLightSwitchPull}
                onCanvasClick={() => setPullMeVisible(false)}
            />
            <div
                className='absolute top-28 left-2 text-slate-500 duration-300'
                style={{ opacity: pullMeVisible ? 1 : 0 }}
            >
                <div className='m-auto'>
                    <ArrowUpward />
                </div>
                <p>Pull me!</p>
            </div>
            <Dropdown isDropped={dropdownActive} />
            {/* <UnderConstruction /> */}
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
                <section className='pl-10'>{renderHero()}</section>
                <div className='z-10'>
                    <FeatureCarousel customSpinTime={spinnerSpeed} compact={isMobile} />
                </div>
            </div>
            <section className='p-12 text-center text-lg lg:text-2xl'>
                <h2
                    className='mb-8 text-center font-bold '
                    style={{ fontFamily: 'var(--font-body)' }}
                >{`Hi, I'm Derek.`}</h2>
                <div>
                    <span>{`I help small businesses local to `}</span>
                    <a href='https://www.google.com/search?q=%23yeahthatgreenville' target='_blank'>
                        {' '}
                        <span className='cursor-pointer duration-300 hover:text-green-600 text-green-600 md:text-black'>
                            #yeahthatgreenville
                        </span>
                    </a>
                    <span>{` succeed on and offline with web and mobile applications that fit their needs. 
                      Whether you want to give your website a facelift or optimize your daily work with software tailored to your needs, I'm here to deliver with a bang 💥`}</span>
                </div>
            </section>

            <div
                className={`md:pb-8 flex justify-between m-auto w-96 max-w-[85%] h-36 gap-2 lg:w-[500px]`}
            >
                <FeatureButton target='/consultation' text='Book a time ⏰' compact={isMobile} />
                <FeatureButton
                    target='mailto:dw.soft.solutions@gmail.com'
                    text='Send me an email 📬'
                    compact={isMobile}
                />
            </div>

            <div className='justify-self-center text-center text-sm md:text-lg lg:text-2xl'>
                <p className='text-lg md:text-xl lg:text-3xl'>Experience:</p>
                <ul className='list-disc'>
                    <li>Blockchain, decentralized apps</li>
                    <li>Enterprise resource platform development</li>
                    <li>Health care claim processing</li>
                    <li>Diabetic meal tracking app</li>
                </ul>
            </div>
            <div className='h-36 m-auto w-fit flex align-middle'>
                <FeatureButton
                    target='https://www.linkedin.com/in/derek-werbowy-946161249/'
                    text='View my LinkedIn 👥'
                    compact={isMobile}
                />
            </div>
        </main>
    )
}
