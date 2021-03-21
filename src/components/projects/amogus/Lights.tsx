import React from "react";
import { useResource } from "react-three-fiber";
import { Color, PointLight } from "three";

const Lights = () => {
  const light1 = useResource<PointLight>();
  const light2 = useResource<PointLight>();

  return (
    <group>
      <ambientLight ref={light2} position={[0, 4, 0]} intensity={0.3} />

      <directionalLight intensity={0.5} position={[0, 0, 0]} color={0xffffff} />

      <pointLight
        ref={light1}
        intensity={1}
        position={[-6, 3, -6]}
        color={new Color("hotpink")}
      >
        {/* {light1.current && <pointLightHelper args={[light1.current]} />} */}
      </pointLight>

      <pointLight
        ref={light2}
        intensity={1}
        position={[6, 3, 6]}
        color={new Color("hotpink")}
      >
        {/* {light2.current && <pointLightHelper args={[light2.current]} />} */}
      </pointLight>
    </group>
  );
};

export default Lights;
