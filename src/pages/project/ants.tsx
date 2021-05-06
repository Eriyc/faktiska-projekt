import { SiteContainer } from "components";
import { PageMetadata } from "components/global/metadata";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("components/projects/ants"), {
  ssr: false,
});

const meta: PageMetadata = {
  description: "simulates small ants and pheremones",
  tags: [""],
  title: "Ant simulation",
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
