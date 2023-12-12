'use client'
import { createPortal } from 'react-dom'
import { useEffect, useState, useRef } from 'react'
import { useMeasure } from 'react-use'

interface DropdownProps {
    isDropped: boolean
}

const Dropdown = ({ isDropped }: DropdownProps) => {
    const [portalRef, { height: screenHeight }] = useMeasure()
    const topOfScreen = screenHeight + 64
    const [dropdownPosition, setDropdownPosition] = useState(topOfScreen)
    const [dropdownVelocity, setDropdownVelocity] = useState(0)
    const docRef = useRef<any>()

    useEffect(() => {
        docRef.current = document
    })

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
        docRef.current &&
        createPortal(
            <div
                ref={portalRef as any}
                className={`w-screen h-screen fixed pt-16 ${
                    dropdownPosition >= screenHeight ? '-z-10' : 'z-40'
                } top-0 overflow-hidden`}
                style={{
                    backgroundColor: `rgba(148, 163, 184, ${backgroundOpacity})`,
                }}
            >
                <div className='w-screen absolute' style={{ bottom: dropdownPosition }}>
                    <div
                        className='w-[80%] h-[100%] bg-slate-50 relative m-auto p-8 pt-32 overflow-auto'
                        style={{
                            borderBottomLeftRadius: '16px',
                            borderBottomRightRadius: '16px',
                            height: `calc(100vh + 64px)`,
                        }}
                    >
                        <div className='m-auto'>
                            <h2 className='text-center mb-4'>
                                The get-down <br /> ⬇️
                            </h2>
                            <iframe
                                className='m-auto w-[200px] h-[140px] sm:w-[400px] sm:h-[280px] md:w-[560px] md:h-[395px] rounded-lg'
                                src='https://www.youtube.com/embed/a1zjPVg7gvI?si=87abSwCu0a2m29BQ'
                                title='YouTube video player'
                                frameBorder='0'
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                                allowFullScreen
                            ></iframe>
                            <h4 className='w-full text-center pt-4'>More coming soon...</h4>
                        </div>
                    </div>
                </div>
            </div>,
            docRef.current.body
        )
    )
}

export default Dropdown
