import { Vec2, Vector2 } from 'three'

const wallTools = {
  createBoundryWalls: (topLeft: Vec2, bottomRight: Vec2) => {
    const p1 = new Vector2(topLeft.x, topLeft.y)
    const p2 = new Vector2(bottomRight.x, topLeft.y)
    const p3 = new Vector2(bottomRight.x, bottomRight.y)
    const p4 = new Vector2(topLeft.x, bottomRight.y)

    const points = [p1, p2, p3, p4]

    const walls = []
    for (let i = 1; i < points.length; i++) {
      walls.push({ start: points[i - 1], end: points[i] })
    }
    walls.push({ start: points[points.length - 1], end: points[0] })

    return walls
  },
}
