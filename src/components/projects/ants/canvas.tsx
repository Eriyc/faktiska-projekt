import { chakra, useSafeLayoutEffect } from '@chakra-ui/react'
import { CanvasContainer } from 'components/global/container'
import { FC, MouseEventHandler, useEffect, useRef } from 'react'
import { Brush } from './brush'
import { useMousePosition } from './hooks'
import { antStore } from './store'
import { antMath } from './math'
import { wallTools } from './obstacle'
import { Vector2 } from 'three'

const AntsCanvas: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const brush = useRef<Brush | null>(null)
  const width = useRef<number>(1000)
  const lastFrame = useRef<number>(0)
  const mouse = useMousePosition(canvas)
  const store = antStore()

  const handleClick: MouseEventHandler = () => {
    store.ants.forEach((ant) => {
      if (antMath.pointInAnt(ant, mouse.current)) {
        ant.toggle()
      }
    })
  }

  useSafeLayoutEffect(() => {
    const getDimensions = (el?: HTMLCanvasElement | null) => {
      if (el) {
        const dimensions = el.getBoundingClientRect()
        width.current = dimensions.width
        el.width = dimensions.width
        el.height = 500
      }
    }
    getDimensions(canvas.current)
    window.addEventListener('resize', () => getDimensions(canvas.current))
  }, [])

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d')!
      brush.current = new Brush(ctx)
      loop()
    }
    return () => window.cancelAnimationFrame(lastFrame.current)
  }, [])

  const loop = () => {
    const canvasEl = canvas.current

    if (canvasEl) {
      const ctx = canvasEl.getContext('2d')!
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      store.setWalls(
        wallTools
          .createBoundryWalls(
            { x: 0, y: 0 },
            { x: canvasEl.width, y: canvasEl.height }
          )
          .map((wall) => {
            wall.draw(ctx)
            return wall
          })
      )

      store.setAnts(
        store.ants.map((ant) => {
          // check conditions
          ant.rays.forEach((ray) => ray.draw(ctx))

          ant.move(store.walls)

          // move the ant
          ant.selected = antMath.pointInAnt(ant, mouse.current)
          ant.facing = (ant.facing + 0.1) % 360
          ant.show(ctx)
          return ant
        })
      )
    }

    const frame = requestAnimationFrame(loop)
    lastFrame.current = frame
  }

  return (
    <chakra.section d="flex" flexDir="column" minH="50vh">
      <CanvasContainer>
        <chakra.span as="canvas" ref={canvas} flex="1" onClick={handleClick}>
          Your browser does not support canvas
        </chakra.span>
      </CanvasContainer>
      <p>{mouse.current.x}</p>
      {JSON.stringify(store.ants[0].rays[0].hit)}
    </chakra.section>
  )
}

export { AntsCanvas }
