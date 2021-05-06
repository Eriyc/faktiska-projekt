import { chakra, useSafeLayoutEffect } from '@chakra-ui/react'
import { CanvasContainer } from 'components/global/container'
import { FC, MouseEventHandler, useEffect, useRef } from 'react'
import { Brush } from 'utils'
import { useMousePosition } from './hooks'
import { antStore } from './store'
import { antMath } from './math'

const AntsCanvas: FC = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const brush = useRef<Brush | null>(null)
  const width = useRef<number>(1000)
  const lastFrame = useRef<number>(0)
  const mouse = useMousePosition(canvas)
  const store = antStore()

  const handleClick: MouseEventHandler = () => {
    console.time('click-time')
    store.ants.forEach((ant) => {
      if (antMath.pointInAnt(ant, mouse.current)) {
        console.timeEnd('click-time')
        alert(`${ant.id}\n${ant.facing}`)
      }
    })
  }

  useSafeLayoutEffect(() => {
    const getDimensions = (el?: HTMLCanvasElement | null) => {
      if (el) {
        const dimensions = el.getBoundingClientRect()
        width.current = dimensions.width
        el.width = dimensions.width
        el.height = dimensions.height
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

      store.setAnts(
        store.ants.map((ant) => {
          //ant.facing = (ant.facing + Math.random()) % 360
          ant.position = antMath.move(ant)
          let active = false
          if (antMath.pointInAnt(ant, mouse.current)) {
            active = true
          }
          if (brush.current) {
            brush.current.drawAnt(ant, active)
          }
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
      <p>{JSON.stringify(mouse)}</p>
    </chakra.section>
  )
}

export { AntsCanvas }
