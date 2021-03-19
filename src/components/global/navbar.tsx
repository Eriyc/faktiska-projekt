import { Container, Heading } from "@chakra-ui/react";
import { SiteLink } from "./NextChakraLink";

export const SiteNavbar = () => {
  return (
    <Container as="section" maxW="100vw" padding="16px 32px">
      <Heading as={SiteLink} href="/" _hover={{ textDecor: "none" }}>
        Projekt
      </Heading>
    </Container>
  );
};
