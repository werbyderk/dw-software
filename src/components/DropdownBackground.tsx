import { useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const DropdownBackground = ({ opacity, isDropped }: { opacity: number; isDropped: boolean }) => {
    const docRef = useRef<any>()

    useEffect(() => {
        docRef.current = document
    })
    return (
        docRef.current &&
        createPortal(
            <div
                className={`w-screen h-screen fixed pt-16 ${
                    isDropped ? '-z-10' : 'z-40'
                } top-0 overflow-hidden`}
                style={{
                    backgroundColor: `rgba(148, 163, 184, ${opacity})`,
                }}
            ></div>,
            docRef.current.body
        )
    )
}

export default DropdownBackground
