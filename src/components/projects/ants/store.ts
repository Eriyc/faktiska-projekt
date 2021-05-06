import create from 'zustand'
import Ant from './ant'
import Obstacle from './obstacle'

type AntStore = {
  ants: Ant[]
  walls: Obstacle[]
  setAnts: (ants: Ant[]) => void
  setWalls: (walls: Obstacle[]) => void
}

const createAnts = (amount: number): Ant[] => {
  return Array.from(Array(amount)).map(
    () =>
      new Ant({
        facing: 180, //Math.random() * 360,
        position: { x: 90, y: 90 },
        size: { x: 10, y: 10 },
        speed: Math.random() * 0,
      })
  )
}

const antStore = create<AntStore>((set) => ({
  ants: createAnts(1),
  walls: [],
  setAnts: (ants: Ant[]) => set({ ants }),
  setWalls: (walls: Obstacle[]) => set({ walls }),
}))

export { antStore }
