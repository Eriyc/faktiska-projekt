import { SiteContainer } from "src/components";
import { PageMetadata } from "src/components/global/metadata";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./_Scene"), {
  ssr: false,
});

const meta: PageMetadata = {
  description: "simple plane in three.js",
  tags: ["three.js", "3d", "beginner", "plane"],
  title: "Three.js simple plane",
  hideMeta: false,
};

const page = () => {
  return (
    <SiteContainer meta={meta}>
      <Scene />
    </SiteContainer>
  );
};

export default page;
