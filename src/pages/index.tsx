import { Stack } from "@chakra-ui/layout";
import { SiteContainer, SiteLink } from "src/components";
import { PageMetadata } from "src/components/global/metadata";

const projekt = ["canvas", "3d-plane"];

const meta: PageMetadata = {
  title: "Ordentliga icke-meme projekt",
  description: "",
  tags: ["tools", "webtools", "experiments"],
};
const Index = () => (
  <SiteContainer meta={meta} hideBorder>
    <Stack>
      {projekt.map((p) => (
        <SiteLink href={`/projekt/${p}`} key={p}>
          {p}
        </SiteLink>
      ))}
    </Stack>
  </SiteContainer>
);

export default Index;
