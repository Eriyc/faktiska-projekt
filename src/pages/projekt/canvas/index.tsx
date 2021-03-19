import { SiteContainer } from "src/components";
import { PageMetadata } from "src/components/global/metadata";
import { Canvas, MeshProps, useFrame } from "react-three-fiber";
import { Suspense, useRef, useState } from "react";
import type { Mesh } from "three";

const meta: PageMetadata = {
  description: "canvas experiments",
  tags: ["draw", "canvas", "react"],
  title: "Canvas",
};

const Box: React.FC<MeshProps> = (props) => {
  const mesh = useRef<Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const CanvasPage = () => {
  return (
    <SiteContainer meta={meta}>
      <Canvas
        orthographic
        camera={{ zoom: 50, position: [10, 10, 10] }}
        style={{ height: "100%", flex: 1 }}
      >
        <Suspense
          fallback={<p>loading</p>}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Suspense>
      </Canvas>
    </SiteContainer>
  );
};

export default CanvasPage;
