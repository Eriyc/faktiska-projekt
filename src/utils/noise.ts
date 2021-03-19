import { makeNoise2D, Noise2D } from "open-simplex-noise";

export type Params = {
  seed: number;
  scale: number;
  persistence: number;
  octaves: number;
  lacunarity: number;
  exponentiation: number;
  height: number;
};

class _NoiseGenerator {
  _params;
  _noise = {} as Noise2D;
  constructor(params: Params) {
    this._params = params;
    this._Init();
  }

  _Init() {
    this._noise = makeNoise2D(this._params.seed);
  }

  Get(x: number, y: number) {
    const xs = x / this._params.scale;
    const ys = y / this._params.scale;
    const noiseFunc = this._noise;
    const G = 2.0 ** -this._params.persistence;
    let amplitude = 1.0;
    let frequency = 1.0;
    let normalization = 0;
    let total = 0;
    for (let o = 0; o < this._params.octaves; o++) {
      const noiseValue = noiseFunc(xs * frequency, ys * frequency) * 0.5 + 0.5;
      total += noiseValue * amplitude;
      normalization += amplitude;
      amplitude *= G;
      frequency *= this._params.lacunarity;
    }
    total /= normalization;
    return Math.pow(total, this._params.exponentiation) * this._params.height;
  }
}

export const noise = {
  simplex: (params: Params) => new _NoiseGenerator(params),
};
