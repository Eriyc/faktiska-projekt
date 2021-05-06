import { Vec2, Vector2 } from 'three'
import Ant from './ant'

export const antMath = {
  pointInAnt: (ant: Ant, point: Vec2) => {
    const { x: w, y: h } = ant.size
    const topLeft = ant.position
    const bottomRight = { x: topLeft.x + w, y: topLeft.y + h }
    const rad = ant.facing * (Math.PI / 180)

    // rotate point along ant center
    const xCenter = topLeft.x + w * 0.5
    const yCenter = topLeft.y + h * 0.5

    const { x, y } = point
    const translatedPoint = antMath.rotatePoint(
      { x, y },
      { x: xCenter, y: yCenter },
      rad
    )

    // check if translated point is in original square
    return (
      translatedPoint.x > topLeft.x &&
      translatedPoint.x < bottomRight.x &&
      translatedPoint.y > topLeft.y &&
      translatedPoint.y < bottomRight.y
    )
  },
  rotatePoint: (point: Vec2, center: Vec2, angle: number) => {
    return new Vector2(point.x, point.y).rotateAround(
      new Vector2(center.x, center.y),
      -angle
    )
  },
}
