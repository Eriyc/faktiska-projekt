import create from 'zustand'
import { v4 as uuid } from 'uuid'
import type { Ant, Wall } from './types'

type AntStore = {
  ants: Ant[]
  setAnts: (ants: Ant[]) => void
  walls: Wall[]
}

const createAnts = (amount: number): Ant[] => {
  return Array.from(Array(amount)).map(() => ({
    facing: Math.random() * 360,
    id: uuid(),
    position: { x: 500, y: 500 },
    size: { x: 10, y: 10 },
    speed: Math.random() * 3,
  }))
}

const antStore = create<AntStore>((set) => ({
  ants: createAnts(10),
  setAnts: (ants: Ant[]) => set({ ants }),
  walls: [],
}))

export { antStore }
