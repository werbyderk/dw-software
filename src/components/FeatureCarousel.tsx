import { useState, useRef, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import { useMeasure } from 'react-use'

const EASTER_EGG_ITEMS = [
    'oh hi',
    "you've been here for a while!",
    'maybe you forgot this in the background',
    'or just really, really thinking hard',
    'about sending me an email',
    'anyways...',
    "nice day today isn't it?",
    "there's some neat looking clouds over there",
    'and uh...',
    'nice shoes.',
    '*crickets*',
    '...',
    '😗🎶',
    '🤨',
    '😅',
    '😶',
    '',
    '',
    '',
    '👹',
]
const FEATURE_ITEMS = [
    'mobile applications',
    'blockchain projects',
    'web applications',
    'software automation',
    'mobile-friendly websites',
    'user interface design',
]

const carouselStyles: any = (lineHeight: number, delay: number) => {
    const ctr = {} //{ transition: 'width 500ms' }
    return {
        entering: {
            ctr: { ...ctr, transform: `translateY(-${lineHeight}px)` },
            last: { opacity: 0.5, display: 'block' },
            current: { opacity: 1 },
            next: { opacity: 0.5 },
            offStage: { opacity: 0 },
            hideOffStage: true,
        },
        entered: {
            ctr: { ...ctr, transform: `translateY(-${lineHeight}px)` },
            last: { opacity: 0.5 },
            current: { opacity: 1 },
            next: { opacity: 0.5 },
            offStage: { opacity: 0.5, display: 'block', transition: `opacity ${delay}ms` },
        },
        exiting: {
            ctr: {
                ...ctr,
                transform: `translateY(-${lineHeight * 2}px)`,
                transition: /*ctr.transition + ', ' +*/ `transform ${delay}ms`,
            },
            last: { opacity: 0, transition: `opacity ${delay}ms` },
            current: { opacity: 0.5, transition: `opacity ${delay}ms` },
            next: { opacity: 1, transition: `opacity ${delay}ms` },
            offStage: { opacity: 0.5, transition: `opacity ${delay}ms` },
        },
        exited: {
            ctr: { ...ctr, transform: `translateY(-${lineHeight * 2}px)` },
            last: { opacity: 0, display: 'none' },
            current: { opacity: 0.5 },
            next: { opacity: 1 },
            offStage: { opacity: 0.5 },
        },
    }
}

const FeatureCarousel = (props: { customSpinTime?: number; compact?: boolean }) => {
    const [transitionIn, setTransitionIn] = useState(true)
    const [featureItem, setFeatureItem] = useState(0)
    const [featureStyles, setFeatureStyles] = useState<any>()
    const [visible, setVisible] = useState(false)
    const [currentFeatureRef, { width: _currentFeatureWidth }] = useMeasure()
    const [nextFeatureRef, { width: _nextFeatureWidth }] = useMeasure()
    const [offStageRef, { width: _offStageWidth }] = useMeasure()
    const [firstTransition, setFirstTransition] = useState(true)
    const [carouselWidth, setCarouselWidth] = useState(0)
    const lineHeightRef = useRef()
    const selectedCarousel = FEATURE_ITEMS

    const last =
        selectedCarousel[featureItem - 1 >= 0 ? featureItem - 1 : selectedCarousel.length - 1]
    const current = selectedCarousel[featureItem]
    const nextIdx = featureItem + 1 < selectedCarousel.length ? featureItem + 1 : 0
    const next = selectedCarousel[nextIdx]
    const offStage = selectedCarousel[nextIdx + 1 < selectedCarousel.length ? nextIdx + 1 : 0]

    const animationDuration = props.customSpinTime ?? 2000

    const setLineHeight = () => {
        const lineHeightProperty = lineHeightRef.current
            ? window.getComputedStyle(lineHeightRef.current, null).getPropertyValue('line-height')
            : '0'
        const lineHeight = parseInt(lineHeightProperty.substring(0, lineHeightProperty.length - 2))
        setFeatureStyles(carouselStyles(lineHeight, animationDuration))
        setVisible(true)
    }

    useEffect(() => {
        setLineHeight()
        window.addEventListener('resize', setLineHeight)
        return () => window.removeEventListener('resize', setLineHeight)
    }, [animationDuration])

    return (
        <div
            className='flex justify-center transition-opacity duration-300 h-12 md:h-16'
            style={{ opacity: visible ? 1 : 0 }}
        >
            <h3 className='text-xs sm:text-lg md:text-xl lg:text-3xl'>Quality</h3>
            <Transition
                in={transitionIn}
                timeout={animationDuration}
                appear
                onEntering={() => {
                    if (_currentFeatureWidth !== 0 && firstTransition) {
                        setCarouselWidth(
                            [_currentFeatureWidth, _nextFeatureWidth].sort((a, b) => b - a)[0]
                        )
                        setFirstTransition(false)
                    }
                }}
                onEntered={() => {
                    setTransitionIn(false)
                }}
                onExiting={() => {
                    if (_offStageWidth !== 0 || _nextFeatureWidth !== 0) {
                        const compare = props.customSpinTime
                            ? [_nextFeatureWidth, _currentFeatureWidth, _offStageWidth]
                            : [_offStageWidth, _nextFeatureWidth]
                        setCarouselWidth(compare.sort((a, b) => b - a)[0])
                    }
                }}
                onExited={() => {
                    setFeatureItem((prev) => {
                        const next = prev + 1
                        return next < FEATURE_ITEMS.length ? next : 0
                    })
                    setTransitionIn(true)
                }}
            >
                {(state) => {
                    const styles = featureStyles && featureStyles[state]
                    return (
                        <div
                            style={{
                                transition: 'width 2s',
                                transitionTimingFunction: 'ease-in-out',
                                width: carouselWidth !== 0 ? carouselWidth : 'auto',
                                WebkitTextFillColor: 'black',
                            }}
                            className='ease-in overflow-visible'
                        >
                            <div style={styles?.ctr} className='whitespace-nowrap w-max'>
                                <h3
                                    ref={lineHeightRef as any}
                                    style={styles?.last}
                                    className='w-min text-xs sm:text-lg md:text-xl lg:text-3xl'
                                >
                                    &nbsp;{last}
                                </h3>
                                <div>
                                    <h3
                                        ref={currentFeatureRef as any}
                                        style={styles?.current}
                                        className='w-min text-xs sm:text-lg md:text-xl lg:text-3xl'
                                    >
                                        &nbsp;{current}
                                    </h3>
                                </div>
                                <div>
                                    <h3
                                        ref={nextFeatureRef as any}
                                        style={styles?.next}
                                        className='w-min text-xs sm:text-lg md:text-xl lg:text-3xl'
                                    >
                                        &nbsp;{next}
                                    </h3>
                                </div>
                                <div>
                                    <h3
                                        ref={offStageRef as any}
                                        style={styles?.offStage}
                                        className='w-min text-xs sm:text-lg md:text-xl lg:text-3xl'
                                    >
                                        &nbsp;{offStage}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Transition>
            <h3 className='text-xs md:text-xl sm:text-lg lg:text-3xl'>
                &nbsp;at competitive rates
            </h3>
        </div>
    )
}

export default FeatureCarousel
