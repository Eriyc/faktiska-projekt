import {
  MouseEvent,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
} from 'react'
import { Vec2, Vector2 } from 'three'

const useMousePosition = (ref: RefObject<HTMLElement>) => {
  const pos = useRef<Vec2>(new Vector2(0, 0))

  const trackMouse: MouseEventHandler = (ev): any => {
    const bb = ev.currentTarget.getBoundingClientRect()
    const newPos = new Vector2(ev.clientX - bb.left, ev.clientY - bb.top)
    pos.current = newPos
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('mousemove', (ev) =>
        trackMouse(
          (ev as unknown) as MouseEvent<HTMLElement, globalThis.MouseEvent>
        )
      )
    }
  }, [ref.current])

  return pos
}

export default useMousePosition
