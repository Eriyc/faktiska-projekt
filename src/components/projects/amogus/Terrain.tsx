import { useRef } from "react";
import { Color } from "three";

const Terrain = () => {
  const meshRef = useRef();

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} name="plane terrain">
      <planeBufferGeometry attach="geometry" args={[25, 25, 150, 150]} />
      <meshPhongMaterial
        attach="material"
        color={"green"}
        specular={new Color("hotpink")}
        shininess={0}
        flatShading
      />
    </mesh>
  );
};

export default Terrain;
