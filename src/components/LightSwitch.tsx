import Matter, { Constraint, Mouse, MouseConstraint } from 'matter-js'
import { useEffect, useRef } from 'react'
import { flatten } from 'ramda'

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite

const LightSwitch = () => {
    const containerRef = useRef()
    useEffect(() => {
        // create an engine
        var engine = Engine.create()

        // create a renderer
        var render = Render.create({
            element: containerRef.current,
            engine: engine,
            options: {
                background: 'transparent',
                wireframes: false,
                width: 400,
                height: 600,
            },
        })

        // create two boxes and a ground
        // var boxA = Bodies.rectangle(400, 200, 80, 80)
        // var boxB = Bodies.rectangle(450, 50, 80, 80)
        const chain: any[][] = []
        const numOfBeads = 16

        let chainIndex = 0
        let isFirstBody = true
        for (let i = -7; i <= numOfBeads; i++) {
            const lastBody = isFirstBody ? undefined : chain[chainIndex - 1][0]
            const x = 20 + i * -3
            const y = 17 * (i + 1 - 8)
            const isHandle = i === numOfBeads
            const nextBody = isHandle
                ? Bodies.rectangle(x, y + 20, 15, 50, {
                      chamfer: { radius: 3 },
                      render: { fillStyle: '#1CDBB6' },
                  })
                : Bodies.circle(x, y, 7, { render: { fillStyle: '#47A2E8' } })
            const constraint = isFirstBody
                ? undefined
                : Constraint.create({
                      stiffness: 1.5,
                      damping: 0.2,
                      render: { lineWidth: 0, anchors: false },
                      bodyA: lastBody,
                      bodyB: nextBody,
                      pointB: isHandle ? { x: 0, y: -25 } : undefined,
                  })
            if (isFirstBody) isFirstBody = false
            chainIndex++
            chain.push([nextBody, constraint])
        }
        // const constraint = Constraint.create({ bodyA: boxA, pointB: { x: 20, y: 0 } })
        const topCanvasConstraint = Constraint.create({
            stiffness: 0.1,
            damping: 0.1,
            render: { lineWidth: 0, anchors: false },
            pointA: { x: 20, y: 17 * -7 - 800 },
            bodyB: chain[0][0],
        })

        // add all of the bodies to the world
        const flatChain = flatten(chain).filter((el) => el !== undefined)
        console.debug([topCanvasConstraint, ...flatChain])
        const mouse = Mouse.create(render.canvas)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.03,
                damping: 0.2,
                render: {
                    visible: false,
                },
            },
            // body: flatChain[flatChain.length - 2],
        })
        Composite.add(engine.world, [topCanvasConstraint, ...flatChain, mouseConstraint])

        render.mouse = mouse
        // run the renderer
        Render.run(render)

        // create runner
        var runner = Runner.create()

        // run the engine
        Runner.run(runner, engine)
    }, [])

    return <div ref={containerRef as any} className='absolute top-0 left-0 z-10'></div>
}

export default LightSwitch
