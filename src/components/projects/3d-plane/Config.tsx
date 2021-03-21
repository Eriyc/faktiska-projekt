import { Box } from "@chakra-ui/layout";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import { Params } from "utils";
import { useStore } from "./store";
type ItemKeys = keyof Params;

const items: ItemKeys[] = [
  "exponentiation",
  "height",
  "scale",
  "persistence",
  "octaves",
  "lacunarity",
  "seed",
];

const ConfigItem = ({ item }: { item: ItemKeys }) => {
  const store = useStore();
  const { terrain } = store;

  const handleTerrainUpdate = (val: Partial<Params>) => {
    store.updateTerrain(val);
  };

  if (item === "seed") {
    return (
      <section>
        <p>seed: {terrain.seed}</p>
      </section>
    );
  }

  return (
    <section>
      <p>
        {item} - {terrain[item]}
      </p>
      <Slider
        aria-label="slider-ex-1"
        value={terrain[item]}
        max={3}
        min={0}
        step={0.25}
        onChange={(e) => handleTerrainUpdate({ [item]: e })}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </section>
  );
};

const ConfigBox = () => {
  return (
    <Box
      backgroundColor="white"
      pos="absolute"
      top="8px"
      left="8px"
      textColor="black"
      width="200px"
      padding="8px"
      zIndex="10"
    >
      {items.map((i) => (
        <ConfigItem item={i} key={i} />
      ))}
    </Box>
  );
};

export default ConfigBox;
