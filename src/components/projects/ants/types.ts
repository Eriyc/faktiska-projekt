import { Vec2 } from 'three'
import Ant from './ant'

export type AntConstructor = {
  position: Vec2
  size: Vec2
  facing: number
  speed: number
}

export type AntWithoutMethods = {
  [P in keyof Ant as Ant[P] extends Function ? never : P]: Ant[P]
}

export interface Wall {
  start: Vec2
  end: Vec2
}
