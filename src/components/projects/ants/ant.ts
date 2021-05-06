import { Vec2 } from 'three'
import { AntConstructor } from './types'
import AntRay from './ray'
import { v4 as uuid } from 'uuid'
import { math } from 'utils'
import Obstacle from './obstacle'

// angle in degrees
const FOV = 60
// amount of rays
const RAYS = 15
export default class Ant {
  position: Vec2
  size: Vec2
  facing: number
  id: string
  speed: number
  active: boolean
  selected = false
  rays: AntRay[] = []

  constructor({ position, size, facing, speed }: AntConstructor) {
    this.position = position
    this.size = size
    this.facing = facing
    this.speed = speed
    this.active = false
    this.id = uuid()
  }
  toggle = () => (this.active = !this.active)
  move = (obstacles: Obstacle[]) => {
    const rDeg = this.facing
    const { x: x0, y: y0 } = this.position
    const { x: w, y: h } = this.size

    const rDegStart = rDeg - FOV / 2

    this.rays = Array.from(Array(RAYS)).map(
      (_, i) =>
        new AntRay(
          { x: x0 + w / 2, y: y0 + h / 2 },
          (rDegStart + FOV * math.normalize(i, 0, RAYS)) * (Math.PI / 180),
          obstacles
        )
    )

    this.rays.forEach((ray) => ray.cast())

    const rad = (360 - this.facing) * (Math.PI / 180)
    const sin = Math.sin(rad)
    const cos = Math.cos(rad)

    const x = this.position.x + this.speed * sin
    const y = this.position.y + this.speed * cos

    this.position = { x, y }
  }
  show = (ctx: CanvasRenderingContext2D) => {
    const { facing, position } = this
    const { x, y } = position
    const w = this.size.x
    const h = this.size.y

    const r = facing * (Math.PI / 180)

    // first save the untranslated/unrotated context
    ctx.fillStyle = this.active ? 'red' : this.selected ? 'orange' : 'gold'
    ctx.save()

    // move the rotation point to the center of the rect
    ctx.translate(x + w / 2, y + h / 2)
    // hack rays in there

    // rotate the rect
    ctx.rotate(r)

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn

    ctx.rect(-w / 2, -h / 2, w, h)
    ctx.fill()
    ctx.restore()
  }
}
