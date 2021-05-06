import { Vec2, Vector2 } from 'three'
import Obstacle from './obstacle'

const RAY_LENGTH = 100

export default class AntRay {
  pos: Vec2
  angle: number
  ray: Vec2[] = []
  obstacles: Obstacle[]
  endLocal: Vec2
  hit: Vec2 | null = null

  constructor(pos: Vec2, angle: number, obstacles: Obstacle[]) {
    this.pos = pos
    this.angle = angle
    this.obstacles = obstacles
    const ray = new Vector2(0, RAY_LENGTH).rotateAround(
      new Vector2(0, 0),
      this.angle
    )
    this.endLocal = ray
  }

  // DDA Algorithm - find indermediate points on a line in a grid
  // - used to find sides a line passes
  _dda = (x0: number, y0: number, x1: number, y1: number): Vec2[] => {
    // delta x & y
    const dx = x1 - x0
    const dy = y1 - y0
    // absolute value shorthand
    const abs = Math.abs
    // steps required for pixels
    const steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy)
    // calculate incrementfor each pixel
    const xInc = dx / steps
    const yInc = dy / steps

    const points = []
    let x = x0
    let y = y0
    for (let i = 0; i <= steps; i++) {
      points.push({ x: Math.floor(x), y: Math.floor(y) })
      x += xInc
      y += yInc
    }
    return points
  }

  cast = () => {
    // calculate ray end
    const base = new Vector2(this.pos.x, this.pos.y)
    const ray = new Vector2(0, RAY_LENGTH).rotateAround(
      new Vector2(0, 0),
      this.angle
    )
    const p2 = base.add(ray)

    // run dda
    const points = this._dda(this.pos.x, this.pos.y, p2.x, p2.y)
    this.ray = points

    // check for hits
    const hit = points.find((point) => {
      return this.obstacles.find((wall) => {
        return wall.inside(point)
      })
    })
    this.hit = hit ?? null
  }
  draw = (ctx: CanvasRenderingContext2D) => {
    const base = new Vector2(this.pos.x, this.pos.y)
    const ray = new Vector2(0, RAY_LENGTH).rotateAround(
      new Vector2(0, 0),
      this.angle
    )
    const p2 = base.add(ray.multiplyScalar(-1))

    ctx.save()
    ctx.resetTransform()
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(this.pos.x, this.pos.y)
    ctx.lineTo(this.pos.x + ray.x, this.pos.y + ray.y)
    ctx.closePath()
    ctx.stroke()

    ctx.strokeStyle = 'blue'
    ctx.fillStyle = this.hit ? 'red' : 'blue'
    ctx.arc(this.hit?.x || p2.x, this.hit?.y || p2.y, 5, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
  }
}
