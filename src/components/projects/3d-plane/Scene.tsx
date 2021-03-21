import { Canvas } from "react-three-fiber";
import { VSMShadowMap } from "three";
import ConfigBox from "./Config";
import Controls from "./Controls";
import Lights from "./Lights";
import Terrain from "./Terrain";

const Scene = () => {
  return (
    <>
      <ConfigBox />
      <Canvas
        camera={{ position: [-15, 15, 0], rotation: [0, 0, 45] }}
        style={{ flex: 1 }}
        pixelRatio={window.devicePixelRatio}
        concurrent
        gl={{ antialias: true }}
        shadowMap={{ type: VSMShadowMap }}
      >
        <Lights />
        <Controls />
        <Terrain />
        <axesHelper />
      </Canvas>
    </>
  );
};

export default Scene;
