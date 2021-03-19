import { useFrame, useUpdate } from "react-three-fiber";
import { Mesh, DoubleSide, Color } from "three";

import { noise } from "src/utils";
import { useStore } from "./_store";

function fromArrayLike(arr: ArrayLike<any>) {
  return Array.from(arr);
}

const Terrain = () => {
  const store = useStore();

  const meshRef = useUpdate<Mesh>(
    ({ geometry }) => {
      const { exponentiation } = store.terrain;
      const simplex = noise.simplex(store.terrain);

      let pos = geometry.getAttribute("position");
      let pa = pos.array;
      const hVerts = geometry.parameters.heightSegments + 1;
      const wVerts = geometry.parameters.widthSegments + 1;
      for (let j = 0; j < hVerts; j++) {
        for (let i = 0; i < wVerts; i++) {
          pa[3 * (j * wVerts + i) + 2] =
            (simplex.Get(i / 100, j / 100) +
              simplex.Get((i + 200) / 50, j / 50) *
                Math.pow(exponentiation, 1) +
              simplex.Get((i + 400) / 25, j / 25) *
                Math.pow(exponentiation, 2) +
              simplex.Get((i + 600) / 12.5, j / 12.5) *
                Math.pow(exponentiation, 3) +
              simplex.Get((i + 800) / 6.25, j / 6.25) *
                Math.pow(exponentiation, 4)) /
            2;
        }
      }

      pos.needsUpdate = true;
    },
    [store.terrain]
  );

  // Raf loop
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.001;
    }
  });

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
