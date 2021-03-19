import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";

const Controls = () => {
  return (
    <>
      <OrbitControls />
      <OrthographicCamera position={[0, 0, 0]} />
    </>
  );
};

export default Controls;
