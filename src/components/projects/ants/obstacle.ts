import { Vec2, Vector2 } from 'three'

export default class Obstacle {
  points: Vec2[]

  constructor(points: Vec2[]) {
    if (points.length < 2) {
      throw Error('Obstacle needs more than one point!')
    }
    this.points = points
  }

  draw = (ctx: CanvasRenderingContext2D) => {
    ctx.moveTo(500, 250)
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    /* ctx.moveTo(this.points[0].x, this.points[0].y) */
    if (this.points.length == 2) {
    }

    ctx.beginPath()

    // draw every line
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i]
      ctx.lineTo(p.x, p.y)
    }

    if (this.points.length > 2) {
      ctx.lineTo(this.points[0].x, this.points[0].y)
    }

    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  inside = (point: Vec2) => {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

    const { x, y } = point
    const p = this.points
    let inside = false
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const xi = Math.floor(p[i].x),
        yi = Math.floor(p[i].y)
      const xj = Math.floor(p[j].x),
        yj = Math.floor(p[j].y)

      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }

    return inside
  }
}

export const wallTools = {
  createBoundryWalls: (topLeft: Vec2, bottomRight: Vec2) => {
    const p1 = new Vector2(topLeft.x - 5, topLeft.y - 5)
    const p2 = new Vector2(bottomRight.x + 5, topLeft.y - 5)
    const p3 = new Vector2(bottomRight.x + 5, bottomRight.y + 5)
    const p4 = new Vector2(topLeft.x - 5, bottomRight.y + 5)

    const points = [p1, p2, p3, p4]

    const walls = []
    for (let i = 1; i < points.length; i++) {
      walls.push(new Obstacle([points[i - 1], points[i]]))
    }
    walls.push(new Obstacle([points[points.length - 1], points[0]]))

    return walls
  },
}
