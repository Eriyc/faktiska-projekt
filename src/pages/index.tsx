import { Stack } from "@chakra-ui/layout";
import { SiteContainer, SiteLink } from "components";
import { PageMetadata } from "components/global/metadata";

const projekt = ["canvas", "3d-plane", /* "amogus", "planets" */];

const meta: PageMetadata = {
  title: "Ordentliga icke-meme projekt",
  description: "",
  tags: ["tools", "webtools", "experiments"],
};
const Index = () => (
  <SiteContainer meta={meta} hideBorder>
    <Stack>
      {projekt.map((p) => (
        <SiteLink href={`/project/${p}`} key={p}>
          {p}
        </SiteLink>
      ))}
    </Stack>
  </SiteContainer>
);

export default Index;
