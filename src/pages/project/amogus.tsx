import { SiteContainer } from "components";
import { PageMetadata } from "components/global/metadata";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("components/projects/amogus/Scene"), {
  ssr: false,
});

const meta: PageMetadata = {
  description: "no way?",
  tags: ["three.js", "3d", "among us", "game"],
  title: "Among us in real life??",
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
