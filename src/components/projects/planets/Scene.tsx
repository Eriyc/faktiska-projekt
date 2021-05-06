import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import Lights from "./Lights";
import Terrain from "./Terrain";

const Scene = () => {
  return (
    <>
      <Canvas
        camera={{ position: [-5, 5, 5], rotation: [0, 0, 45] }}
        style={{ flex: 1 }}
        pixelRatio={window.devicePixelRatio}
        concurrent
      >
        <Controls />
        <Lights />
        <Terrain />
      </Canvas>
    </>
  );
};

export default Scene;
