import { Vec2 } from 'three'

export interface Ant {
  position: Vec2
  size: Vec2
  facing: number
  id: string
  speed: number
}

export interface Wall {
  start: Vec2
  end: Vec2
}
