'use client'
import Matter, { Constraint, Mouse, MouseConstraint } from 'matter-js'
import { useEffect, useRef, useState } from 'react'
import { findLastIndex, flatten } from 'ramda'

const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Events = Matter.Events

interface LightSwitchProps {
    onPull: () => void
    onCanvasClick: () => void
}

const LightSwitch = ({ onPull, onCanvasClick }: LightSwitchProps) => {
    let isMouseDown = false
    const containerRef = useRef()
    const wrapperRef = useRef(null)
    const hitDownTrigger = useRef(false)
    useEffect(() => {
        const engine = Engine.create()

        const render = Render.create({
            element: containerRef.current,
            engine: engine,
            options: {
                background: 'transparent',
                wireframes: false,
                height: 300,
            },
        })

        window.addEventListener('resize', () => {
            render.bounds.max.x = window.innerWidth
            render.options.width = window.innerWidth
            render.canvas.width = window.innerWidth
        })

        const chain: any[][] = []
        const numOfBeads = 16

        let chainIndex = 0
        let isFirstBody = true
        let handle: Matter.Body
        for (let i = -7; i <= numOfBeads; i++) {
            const lastBody = isFirstBody ? undefined : chain[chainIndex - 1][0]
            const x = 19
            const y = 17 * (i + 1 - 15)
            const isHandle = i === numOfBeads
            const nextBody = isHandle
                ? Bodies.rectangle(x, y + 20, 15, 50, {
                      chamfer: { radius: 3 },
                      render: { fillStyle: '#1CDBB6' },
                  })
                : Bodies.circle(x, y, 7, { render: { fillStyle: '#47A2E8' } })
            if (isHandle) {
                handle = nextBody
            }
            const constraint = isFirstBody
                ? undefined
                : Constraint.create({
                      stiffness: 1,
                      damping: 0.5,
                      render: { lineWidth: 0, anchors: false },
                      bodyA: lastBody,
                      bodyB: nextBody,
                      pointB: isHandle ? { x: 0, y: -25 } : undefined,
                  })
            if (isFirstBody) isFirstBody = false
            chainIndex++
            chain.push([nextBody, constraint])
        }

        const topCanvasConstraint = Constraint.create({
            stiffness: 0.1,
            damping: 0.1,
            render: { lineWidth: 0, anchors: false },
            pointA: { x: 20, y: 17 * -7 - 800 },
            bodyB: chain[0][0],
        })

        // add all of the bodies to the world
        const flatChain = flatten(chain).filter((el) => el !== undefined)
        const mouse = Mouse.create(render.canvas)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.025,
                damping: 0.4,
                render: {
                    visible: false,
                },
            },
        })

        Composite.add(engine.world, [topCanvasConstraint, ...flatChain, mouseConstraint])

        render.mouse = mouse
        Render.run(render)

        const runner = Runner.create()

        mouseConstraint.mouse.element.removeEventListener(
            'mousewheel',
            (mouseConstraint.mouse as any).mousewheel
        )
        mouseConstraint.mouse.element.removeEventListener(
            'DOMMouseScroll',
            (mouseConstraint.mouse as any).mousewheel
        )

        mouseConstraint.mouse.element.removeEventListener(
            'touchstart',
            (mouseConstraint.mouse as any).mousedown
        )
        mouseConstraint.mouse.element.removeEventListener(
            'touchmove',
            (mouseConstraint.mouse as any).mousemove
        )
        mouseConstraint.mouse.element.removeEventListener(
            'touchend',
            (mouseConstraint.mouse as any).mouseup
        )

        const handleMouseMove = () => {
            if (!isMouseDown) return
            const y = handle.position.y
            if (y >= 120 && hitDownTrigger.current === false) {
                hitDownTrigger.current = true
            }
        }

        const handleMouseEnd = () => {
            if (hitDownTrigger.current) {
                onPull()
                hitDownTrigger.current = false
            }
        }

        mouseConstraint.mouse.element.addEventListener(
            'touchstart',
            (e) => {
                isMouseDown = true
                ;(mouseConstraint.mouse as any).mousedown(e)
                onCanvasClick()
            },
            { passive: true }
        )
        mouseConstraint.mouse.element.addEventListener('touchmove', (e) => {
            if (mouseConstraint.body) {
                ;(mouseConstraint.mouse as any).mousemove(e)
                isMouseDown && handleMouseMove()
            }
        })

        mouseConstraint.mouse.element.addEventListener('touchend', (e) => {
            if (mouseConstraint.body) {
                ;(mouseConstraint.mouse as any).mouseup(e)
            }
            isMouseDown = false
        })

        Events.on(mouseConstraint, 'mouseup', function (event) {
            var mousePosition = (event as any).mouse.position
            isMouseDown = false
            handleMouseEnd()
        })
        Events.on(mouseConstraint, 'mousedown', () => {
            isMouseDown = true
            onCanvasClick()
        })
        Events.on(mouseConstraint, 'mousemove', (e) => {
            isMouseDown && handleMouseMove()
        })

        Runner.run(runner, engine)
    }, [])

    return (
        <div ref={wrapperRef}>
            <div ref={containerRef as any} className='absolute top-0 left-0 z-50' />
        </div>
    )
}

export default LightSwitch
