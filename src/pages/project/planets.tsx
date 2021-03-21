import { SiteContainer } from "components";
import { PageMetadata } from "components/global/metadata";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("components/projects/planets/Scene"), {
  ssr: false,
});

const meta: PageMetadata = {
  description: "",
  tags: ["three.js", "3d", "planet", "sphere"],
  title: "Planets 3d",
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
