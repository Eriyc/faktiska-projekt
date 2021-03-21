import { OrbitControls, OrthographicCamera } from "@react-three/drei";

const Controls = () => {
  return (
    <>
      <OrbitControls position={[-25, -25, -25]} />
      <OrthographicCamera position={[-25, -25, -25]} />
    </>
  );
};

export default Controls;
