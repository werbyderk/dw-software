'use client'
import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'

interface DropdownProps {
    isDropped: boolean
    isMobile: boolean
}

const Dropdown = ({ isDropped, isMobile }: DropdownProps) => {
    const [portalRef, { height: screenHeight }] = useMeasure()
    const [dropdownPosition, setDropdownPosition] = useState(screenHeight)
    const [dropdownVelocity, setDropdownVelocity] = useState(0)

    useEffect(() => {
        if (isDropped) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [isDropped])

    useEffect(() => {
        setDropdownPosition(screenHeight)
    }, [screenHeight])

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
        } else if (dropdownPosition < screenHeight && !isDropped) {
            setTimeout(() => {
                setDropdownPosition((prev) => prev + 10 * 1.5)
            }, 10)
        }
    }, [dropdownPosition, isDropped])

    const backgroundOpacity = ((screenHeight - dropdownPosition) / screenHeight) * 0.6

    return createPortal(
        <div
            ref={portalRef as any}
            className={`w-screen h-screen fixed z-40 top-0 overflow-hidden`}
            style={{
                backgroundColor: `rgba(148, 163, 184, ${backgroundOpacity})`,
            }}
        >
            <div className='w-screen h-screen absolute' style={{ bottom: dropdownPosition }}>
                <div
                    className='w-[80%] h-[100%] bg-slate-50 relative m-auto p-8'
                    style={{
                        borderBottomLeftRadius: '8px',
                        borderBottomRightRadius: '8px',
                    }}
                >
                    <div className='m-auto'>
                        <h2 className='text-center mb-4'>
                            The get-down <br /> ⬇️
                        </h2>
                        <iframe
                            className='m-auto'
                            width='560'
                            height='395'
                            src='https://www.youtube.com/embed/b_Au4VtxYP8?si=E_jcqOrKf5cDZZHZ'
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen
                            {...(isMobile
                                ? { width: 300, height: 210 }
                                : { width: 560, height: 395 })}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Dropdown
