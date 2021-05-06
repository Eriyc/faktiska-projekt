import { Stack } from "@chakra-ui/react";
import { SiteContainer, SiteLink } from "components";
import { PageMetadata } from "components/global/metadata";

const projekt = ["ants"];

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
