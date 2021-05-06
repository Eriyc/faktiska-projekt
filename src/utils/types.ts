import { BufferGeometry } from "three";

export type ExtendedBufferGeometry = BufferGeometry & {
  parameters: {
    height: number;
    width: number;
    heightSegments: number;
    widthSegments: number;
  };
  attributes: {
    position: {
      array: number[];
    };
  };
};
