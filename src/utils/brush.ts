import { Ant } from 'components/projects/ants/types'
import { Vec2 } from 'three'

class Brush {
  ctx: CanvasRenderingContext2D

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
  }

  settings = (color?: string, width?: number) => {
    this.ctx.fillStyle = color ?? this.ctx.fillStyle
    this.ctx.lineWidth = width ?? this.ctx.lineWidth
  }

  drawCircle = (pos: Vec2) => {
    this.ctx.beginPath()
    this.ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI)
    this.ctx.stroke()
    this.settings('blue')
  }

  drawRect = (pos: Vec2, size: Vec2) => {
    this.ctx.rect(pos.x, pos.y, size.x, size.y)
    this.ctx.fill()
  }

  drawAnt = (ant: Ant, active = false) => {
    const { facing, position } = ant
    const { x, y } = position
    const ctx = this.ctx
    const w = ant.size.x
    const h = ant.size.y

    ctx.fillStyle = active ? 'red' : 'gold'

    const r = facing * (Math.PI / 180)
    // first save the untranslated/unrotated context
    ctx.save()

    ctx.beginPath()
    // move the rotation point to the center of the rect
    ctx.translate(x + w / 2, y + h / 2)
    // rotate the rect
    ctx.rotate(r)

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-w / 2, -h / 2, w, h)

    ctx.fill()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, 100)
    ctx.stroke()
    ctx.restore()

    // restore the context to its untranslated/unrotated state
  }
}

export { Brush }
