import { Box } from "@chakra-ui/layout";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import { Canvas, useThree } from "react-three-fiber";
import { Params } from "src/utils";
import Controls from "./_Controls";
import Lights from "./_Lights";
import { useStore } from "./_store";
import Terrain from "./_Terrain";

const Scene = () => {
  const store = useStore();
  const { terrain } = store;

  const handleTerrainUpdate = (val: Partial<Params>) => {
    store.updateTerrain(val);
  };

  return (
    <>
      <Box
        backgroundColor="white"
        pos="absolute"
        top="8px"
        left="8px"
        textColor="black"
        width="200px"
        padding="8px"
      >
        <section>
          <p>exponent</p>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={1}
            max={4}
            min={0}
            step={0.25}
            onChange={(e) => handleTerrainUpdate({ exponentiation: e })}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </section>
      </Box>
      <Canvas
        camera={{ position: [-5, 5, 5], rotation: [0, 0, 45] }}
        style={{ flex: 1 }}
        pixelRatio={window.devicePixelRatio}
        concurrent
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
