'use client'
import { createPortal } from 'react-dom'
import { useEffect, useState, useRef } from 'react'
import { useMeasure } from 'react-use'
import PortfolioCard from './PortfolioCard'
import DropdownBackground from './DropdownBackground'

interface DropdownProps {
    isDropped: boolean
}

const Dropdown = ({ isDropped }: DropdownProps) => {
    const [topOfScreen, setTopOfScreen] = useState<number>(Number.MAX_VALUE)
    const [dropdownPosition, setDropdownPosition] = useState(topOfScreen)
    const [dropdownVelocity, setDropdownVelocity] = useState(0)

    useEffect(() => {
        if (isDropped) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isDropped])

    useEffect(() => {
        setDropdownPosition(isDropped ? 0 : topOfScreen)
    }, [topOfScreen])

    useEffect(() => {
        const updateTopOfScreen = () => setTopOfScreen(window.innerHeight + 64)
        updateTopOfScreen()
        window.addEventListener('resize', updateTopOfScreen)
        return () => window.removeEventListener('resize', updateTopOfScreen)
    }, [])

    useEffect(() => {
        if (dropdownPosition !== 0 && isDropped) {
            setTimeout(
                () =>
                    setDropdownPosition((prevPos) => {
                        let newVelocity = dropdownVelocity
                        if (prevPos <= 0 && dropdownVelocity < 0) {
                            // Hit bottom of screen, bounce up
                            newVelocity = dropdownVelocity * -0.6
                        } else if (prevPos > 0 && dropdownVelocity < 0) {
                            // Falling down
                            newVelocity = dropdownVelocity * 1.2
                        } else if (dropdownVelocity > 0.15) {
                            // Bouncing up
                            newVelocity = dropdownVelocity * 0.8
                        } else if (Math.abs(dropdownVelocity) < 0.15 && prevPos > 0) {
                            // Hit inflection
                            newVelocity = -0.01
                        } else {
                            newVelocity = 0
                        }

                        if (Math.abs(newVelocity) > 2) {
                            newVelocity = newVelocity > 0 ? 2 : -2
                        }
                        setDropdownVelocity(newVelocity)
                        const newPos = prevPos + 10 * newVelocity
                        return newPos
                    }),
                10
            )
        } else if (dropdownPosition < topOfScreen && !isDropped) {
            // Pulling up
            setTimeout(() => {
                setDropdownPosition((prev) => prev + 10 * 1.5)
            }, 10)
        }
    }, [dropdownPosition, isDropped])

    const backgroundOpacity = ((topOfScreen - dropdownPosition) / topOfScreen) * 0.6

    return (
        <div
            suppressHydrationWarning
            className='w-[80%] h-[100%] bg-slate-50 fixed left-[50%] translate-x-[-50%] p-8 overflow-auto flex flex-col z-50 gap-8 content-center'
            style={{
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                height: `calc(100vh + 64px)`,
                bottom: dropdownPosition,
            }}
        >
            <DropdownBackground
                opacity={backgroundOpacity}
                isDropped={dropdownPosition >= topOfScreen - 64}
            />
            <div className='mt-16 ml-32 mr-32'>
                <h4 className='text-center text-xl md:text-4xl mb-4'>Portfolio</h4>
                <hr className='mb-4' />
                <div className='flex justify-center'>
                    <PortfolioCard
                        imgSrc='/images/Greenville-Bike-Taxi.png'
                        title='Greenville Bike Taxi'
                        description='Pedicab service for downtown Greenville, SC'
                    />
                </div>
            </div>
        </div>
    )
}

export default Dropdown
