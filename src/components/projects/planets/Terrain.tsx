import { useRef } from "react";
import { Vector3 } from "react-three-fiber";
import { Mesh } from "three";

const Terrain = () => {
  const planet = new Planet({ position: [0, 0, 0], radius: 5 });

  return <PlanetMesh planet={planet} />;
};

interface PlanetProps {
  position: Vector3;
  radius: number;
}
class Planet implements PlanetProps {
  position;
  radius;

  constructor(params: PlanetProps) {
    this.position = params.position;
    this.radius = params.radius;
  }
}

const PlanetMesh = ({ planet }: { planet: Planet }) => {
  const planetRef = useRef<Mesh>();

  console.log(planetRef.current?.geometry);
  return (
    <mesh position={planet.position} ref={planetRef}>
      <shapeBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="gray" flatShading wireframe />
    </mesh>
  );
};

export default Terrain;
