import { Params } from "src/utils";
import create from "zustand";

type Store = {
  terrain: Params;
  updateTerrain: (val: Partial<Params>) => void;
};

const initialTerrain: Params = {
  exponentiation: 1,
  height: 1,
  lacunarity: 3,
  octaves: 1,
  persistence: 1,
  scale: 1,
  seed: Date.now(),
};

export const useStore = create<Store>((set) => ({
  terrain: initialTerrain,
  updateTerrain: (val: Partial<Params>) =>
    set((state) => ({ terrain: { ...state.terrain, ...val } })),
}));
