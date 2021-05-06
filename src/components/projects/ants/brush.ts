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
}

export { Brush }
